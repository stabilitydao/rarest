// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./ERC2981Royalties.sol";

contract RarestNft is Initializable, ERC1155Upgradeable, ERC2981Royalties, OwnableUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    //TokenId of every NFT
    CountersUpgradeable.Counter private _tokenIds;

    //NFT marketplace address should be approved
    address public marketAddress;

    //IPFS gateway
    string public baseURI;
    //= "https://gateway.pinata.cloud/ipfs/";
    mapping(uint256 => string) private _hashes;

    //Provide marketplace
    function initialize(address marketAddress_, string memory baseURI_) public initializer {
        __ERC1155_init("");
        __Ownable_init();
        marketAddress = marketAddress_;
        baseURI = baseURI_;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function createNFT(
        address recipient,
        uint256 amount,
        string memory hash,
        bytes memory data,
        address royaltyRecipient,
        uint256 royaltyPercent
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId, amount, data);
        _hashes[newTokenId] = hash;
        setApprovalForAll(marketAddress, true);
        if (royaltyPercent > 0) {
            _setTokenRoyalty(newTokenId, royaltyRecipient, royaltyPercent);
        }
        return newTokenId;
    }

    function creatNFTBatch(
        address recipient,
        uint256[] memory amounts,
        string[] memory hashes,
        bytes memory data,
        address[] memory royaltyRecipients,
        uint256[] memory royaltyPercents
    ) public returns (uint256[] memory) {
        require(amounts.length == hashes.length, "amount must be equal to hash");
        uint256[] memory ids = new uint256[](amounts.length);
        for (uint256 i = 0; i < amounts.length; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _hashes[newTokenId] = hashes[i];
            ids[i] = newTokenId;
            if (royaltyPercents[i] > 0) {
                _setTokenRoyalty(newTokenId, royaltyRecipients[i], royaltyPercents[i]);
            }
        }
        _mintBatch(recipient, ids, amounts, data);
        setApprovalForAll(marketAddress, true);
        return ids;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, _hashes[tokenId]));
    }
}
