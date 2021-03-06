// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";
import "./IRarestNft.sol";

contract ERC1155Market is Initializable, ReentrancyGuardUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _itemIds;
    CountersUpgradeable.Counter private _itemsSold;
    CountersUpgradeable.Counter private _itemsCancelled;
    uint256 internal listingPrice;
    uint256 maxRoyaltiesBasisPoints;

    function initialize(uint256 _listinprice, uint256 _maxRoyaltiesBasisPoints) public initializer {
        listingPrice = _listinprice;
        maxRoyaltiesBasisPoints = _maxRoyaltiesBasisPoints;
        __Ownable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    enum MarketItemStatus {
        Active,
        Sold,
        Cancelled
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        uint256 quantity;
        address seller;
        uint256 price;
        MarketItemStatus status;
    }

    //mapping(tokenId => mapping(owner => quantity))
    mapping(uint256 => mapping(address => uint256)) public owners;

    mapping(uint256 => MarketItem) private idToMarketItem;

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    event ListingCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 quantity,
        address seller,
        uint256 price
    );

    event ListingCancelled(uint256 indexed itemId, uint256 quantity);

    event ListingBuy(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 quantity,
        address seller,
        address buyer
    );

    event RoyaltyPaid(address indexed receiver, uint256 indexed amount);

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 quantity_,
        uint256 price // Price of one Item
    ) external payable nonReentrant {
        require(nftContract != address(0), "Address should not be zero");
        require(tokenId != 0, "tokenId should not be zero");
        require(price > 0, "Price must be at least 1 wei");
        require(quantity_ > 0, "quantity must be greater than 0");
        require(IRarestNft(nftContract).balanceOf(msg.sender, tokenId) >= quantity_, "Seller must own it.");
        require(msg.value == listingPrice, "Should be equal to listingPrice");

        _itemIds.increment();

        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            quantity_,
            payable(msg.sender),
            price,
            MarketItemStatus.Active
        );
        emit ListingCreated(itemId, nftContract, tokenId, quantity_, msg.sender, price);
    }

    function buy(
        address nftContract,
        uint256 itemId,
        uint256 quantity_
    ) external payable nonReentrant {
        require(nftContract != address(0), "address should be provided");
        MarketItem storage idToMarketItem_ = idToMarketItem[itemId];
        uint256 tokenId = idToMarketItem_.tokenId;
        require(quantity_ > 0, "Amount must not be zero");
        require(quantity_ <= idToMarketItem_.quantity, "Amount to high");
        require(idToMarketItem_.status == MarketItemStatus.Active, "Listing Not Active");

        require(msg.sender != idToMarketItem_.seller, "Seller can't be buyer");
        uint256 totalPrice = idToMarketItem_.price * quantity_;
        require(msg.value == totalPrice, "price must be a equal to totalprice");

        (address royaltyReceiver, uint256 royaltyAmount) = getRoyalties(
            idToMarketItem_.nftContract,
            idToMarketItem_.tokenId,
            totalPrice
        );

        require(royaltyAmount <= totalPrice, "royalty amount too big");

        if (royaltyAmount > 0) {
            payable(royaltyReceiver).transfer(royaltyAmount);
            emit RoyaltyPaid(royaltyReceiver, royaltyAmount);
        }

        payable(idToMarketItem_.seller).transfer(msg.value - royaltyAmount);

        IRarestNft(nftContract).safeTransferFrom(idToMarketItem_.seller, msg.sender, tokenId, quantity_, "");
        owners[itemId][msg.sender] = quantity_;
        idToMarketItem_.quantity = idToMarketItem_.quantity - quantity_;
        if (idToMarketItem_.quantity == 0) {
            idToMarketItem_.status = MarketItemStatus.Sold;
            _itemsSold.increment();
            payable(owner()).transfer(listingPrice);
        }
        emit ListingBuy(itemId, nftContract, tokenId, quantity_, idToMarketItem_.seller, msg.sender);
    }

    function getRoyalties(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) private view returns (address receiver, uint256 royaltyAmount) {
        (receiver, royaltyAmount) = IRarestNft(nftContract).royaltyInfo(tokenId, price);
        if (receiver == address(0) || royaltyAmount == 0) {
            return (address(0), 0);
        }
        return (receiver, royaltyAmount);
    }

    function cancelMarketItem(uint256 itemId, uint256 quantity_) external nonReentrant {
        MarketItem storage idToMarketItem_ = idToMarketItem[itemId];
        require(msg.sender == idToMarketItem_.seller, "Only Seller can Cancel");
        require(idToMarketItem_.status == MarketItemStatus.Active, "Item must be active");
        require(quantity_ > 0, "quantity must more than 0 ");
        require(idToMarketItem_.quantity >= quantity_, "Item must be more ");
        idToMarketItem_.quantity = idToMarketItem_.quantity - quantity_;
        if (idToMarketItem_.quantity == 0) {
            _itemsCancelled.increment();
            idToMarketItem_.status = MarketItemStatus.Cancelled;
            payable(idToMarketItem_.seller).transfer(listingPrice);
        }

        emit ListingCancelled(itemId, quantity_);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current() - _itemsCancelled.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].status == MarketItemStatus.Active) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs(address sender) public view returns (MarketItem[] memory, uint256[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (owners[i + 1][sender] != 0) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256[] memory quantity = new uint256[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (owners[i + 1][sender] != 0) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                quantity[currentIndex] = owners[currentId][sender];
                currentIndex += 1;
            }
        }
        return (items, quantity);
    }

    function fetchItemsCreated(address sender) public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
