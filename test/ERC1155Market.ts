import chai from 'chai';
import {ethers, upgrades} from 'hardhat';
import {ERC1155Market, RarestNft, ERC1155Market__factory, RarestNft__factory} from '../typechain-types';
const {expect} = chai;
describe('RarestNft', async () => {
    let erc1155market: ERC1155Market;
    let rarestnft: RarestNft;
    let marketAddress: string;
    let rarestAddress: string;

    before(async () => {
        const [deployer, tester, devFund] = await ethers.getSigners();
        const _deployer = deployer;
        let _listinprice: string = '25000000000000000';
        let _maxRoyaltiesBasisPoints: number = 4000;
        const ERC1155Marketfactory = (await ethers.getContractFactory(
            'ERC1155Market',
            _deployer,
        )) as ERC1155Market__factory;
        erc1155market = (await upgrades.deployProxy(ERC1155Marketfactory, [_listinprice, _maxRoyaltiesBasisPoints], {
            kind: 'uups',
        })) as ERC1155Market;
        await erc1155market.deployed();
        marketAddress = erc1155market.address;
    });

    beforeEach(async () => {
        const [deployer, tester, devFund] = await ethers.getSigners();
        const _deployer = deployer;
        const baseURI: string = 'https://gateway.pinata.cloud/ipfs/';
        const RarestNftfactory = (await ethers.getContractFactory('RarestNft', _deployer)) as RarestNft__factory;
        rarestnft = (await upgrades.deployProxy(RarestNftfactory, [marketAddress, baseURI], {
            kind: 'uups',
        })) as RarestNft;
        await rarestnft.deployed();
        rarestAddress = rarestnft.address;
    });

    it('Is contracts deployed', async () => {
        expect(rarestAddress).to.be.not.undefined;
        expect(marketAddress).to.be.not.undefined;
        expect(rarestAddress).to.be.not.null;
        expect(marketAddress).to.be.not.null;
    });
    it('createMarketItem and fetch created items testing', async () => {
        let [recipient]: string[] = await ethers.provider.listAccounts();
        let amount: number = 20;
        let hash: string = '0xRajkumar';
        let data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        const returnTokenID = await rarestnft.createNFT(
            recipient,
            amount,
            hash,
            data,
            royaltyRecipient,
            royaltyPercent,
        );
        const Id: any = await returnTokenID.wait();
        const tokenId: number = parseInt(Id.events[1].data, 16);
        const price: string = '1000000000000000000';
        const type: number = 0;
        //Item Listing
        await erc1155market.createMarketItem(rarestAddress, tokenId, amount, price, type, 0, {
            value: ethers.utils.parseUnits('0.025', 'ether'),
        });

        //Getting listed Item
        const items = await erc1155market.fetchItemsCreated(recipient);
        const item = items[0];

        //tokenId must be same
        expect(item.tokenId.toNumber()).to.equal(tokenId);
    });

    it('Listing and selling item', async () => {
        let [recipient, sender]: string[] = await ethers.provider.listAccounts();
        let amount: number = 20;
        let hash: string = '0xRajkumar';
        let data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        const returnTokenID = await rarestnft.createNFT(
            recipient,
            amount,
            hash,
            data,
            royaltyRecipient,
            royaltyPercent,
        );
        const Id: any = await returnTokenID.wait();
        const tokenId: number = parseInt(Id.events[1].data, 16);
        const price: string = '1000000000000000000';
        const type: number = 0;
        //Item Listing
        await erc1155market.createMarketItem(rarestAddress, tokenId, amount, price, type, 0, {
            value: ethers.utils.parseUnits('0.025', 'ether'),
        });

        // Buy Item
        const [_, buyer] = await ethers.getSigners();
        // item will be one becouse we are creating one item only
        const itemid: number = 1;
        await erc1155market.connect(buyer).buy(rarestAddress, itemid, amount, {
            value: ethers.utils.parseUnits('20', 'ether'),
        });

        //Fetch purchased items
        const ownedItems = await erc1155market.connect(buyer).fetchMyNFTs(sender);
        //Item should not be undefined and null
        expect(ownedItems).to.be.not.undefined;
        expect(ownedItems).to.be.not.null;
    });

    it('Listing and Cancelling and fetching market items', async () => {
        let [recipient, sender]: string[] = await ethers.provider.listAccounts();
        let amount: number = 20;
        let hash: string = '0xRajkumar';
        let data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        const returnTokenID = await rarestnft.createNFT(
            recipient,
            amount,
            hash,
            data,
            royaltyRecipient,
            royaltyPercent,
        );
        const Id: any = await returnTokenID.wait();
        const tokenId: number = parseInt(Id.events[1].data, 16);
        const price: string = '1000000000000000000';
        const type: number = 0;
        //Item Listing
        await erc1155market.createMarketItem(rarestAddress, tokenId, amount, price, type, 0, {
            value: ethers.utils.parseUnits('0.025', 'ether'),
        });

        //Cancelling item
        //only 10 items and left must be 10 Items
        let itemId: number = 3; //itemid =3 becouse it's 3rd item
        amount = 10;
        await erc1155market.cancelMarketItem(itemId, amount);

        //Fetch purchsed items
        const marketitem = await erc1155market.fetchMarketItems();
        const leftitem: number = marketitem[1].quantity.toNumber();
        expect(leftitem).to.be.equal(10); // Left item must be 10 becouse we cancelled 10 items
    });

    it("Creating adding Bid and adding higher bid then checking it's working or not", async () => {
        let [recipient, sender, sender1]: string[] = await ethers.provider.listAccounts();
        let amount: number = 1;
        let hash: string = '0xRajkumar';
        let data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        const returnTokenID = await rarestnft.createNFT(
            recipient,
            amount,
            hash,
            data,
            royaltyRecipient,
            royaltyPercent,
        );

        const Id: any = await returnTokenID.wait();
        const tokenId: number = parseInt(Id.events[1].data, 16);
        const price: string = '1000000000000000000';
        const type: number = 1;
        //Item Listing
        await erc1155market.createMarketItem(rarestAddress, tokenId, amount, price, type, 3600, {
            value: ethers.utils.parseUnits('0.025', 'ether'),
        });

        //ItemType should be one
        const items = await erc1155market.fetchItemsCreated(recipient);
        const itemtype = items[3].itemtype;
        expect(itemtype).to.be.equal(1);

        // Making first Bid with less amount
        let itemId: number = 4;
        let firstBid: string = '0.9';
        let quantity: number = 1;
        const [_, buyer1, buyer2] = await ethers.getSigners();
        await erc1155market.connect(buyer1).makeBid(rarestAddress, itemId, quantity, {
            value: ethers.utils.parseUnits(firstBid, 'ether'),
        });

        // making second BID iwth higher amount
        let secondBid: string = '1.1';
        await erc1155market.connect(buyer2).makeBid(rarestAddress, itemId, quantity, {
            value: ethers.utils.parseUnits(secondBid, 'ether'),
        });

        // Fetch purchased items
        //quantity should be one
        const purchasedauction = await erc1155market.connect(buyer2).fetchMyNFTs(sender1);
        const purchasedquantity = purchasedauction[1].toString();
        expect(purchasedquantity).to.be.equal('1');
    });

    it('Creating and removing BID', async () => {
        let [recipient, sender]: string[] = await ethers.provider.listAccounts();
        let amount: number = 1;
        let hash: string = '0xRajkumar';
        let data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        const returnTokenID = await rarestnft.createNFT(
            recipient,
            amount,
            hash,
            data,
            royaltyRecipient,
            royaltyPercent,
        );

        const Id: any = await returnTokenID.wait();
        const tokenId: number = parseInt(Id.events[1].data, 16);
        const price: string = '1000000000000000000';
        const type: number = 1;
        //Item Listing
        await erc1155market.createMarketItem(rarestAddress, tokenId, amount, price, type, 3600, {
            value: ethers.utils.parseUnits('0.025', 'ether'),
        });

        // Making first Bid with less amount
        let itemId: number = 5;
        let firstBid: string = '0.9';
        let quantity: number = 1;
        const [_, buyer1] = await ethers.getSigners();
        await erc1155market.connect(buyer1).makeBid(rarestAddress, itemId, quantity, {
            value: ethers.utils.parseUnits(firstBid, 'ether'),
        });

        //previous balance before making Bid
        const preBalance = await ethers.provider.getBalance(sender);

        //Remove Bid
        await erc1155market.connect(buyer1).removeBid(itemId);

        //balance after removing bid
        const aftBalance = await ethers.provider.getBalance(sender);

        //Balance after removing bid should be more
        console.log(preBalance, aftBalance);
    });
});
