import {expect} from 'chai';
import {ethers, upgrades} from 'hardhat';
import {RarestNft, RarestNft__factory} from '../typechain-types';
describe('RarestNft', async () => {
    let rarestnft: RarestNft;
    let marketAddress: string = '0x18B820C66704AD3507AF3fbE1634cCC67EcdE49d';
    let rarestAddress: string;
    const baseURI: string = 'https://gateway.pinata.cloud/ipfs/';
    beforeEach(async () => {
        const [deployer, tester, devFund] = await ethers.getSigners();
        const _deployer = deployer;
        const RarestNftfactory = (await ethers.getContractFactory('RarestNft', _deployer)) as RarestNft__factory;
        rarestnft = (await upgrades.deployProxy(RarestNftfactory, [marketAddress, baseURI], {
            kind: 'uups',
        })) as RarestNft;
        await rarestnft.deployed();
    });

    it('Is contract deployed', async () => {
        rarestAddress = rarestnft.address;
        expect(rarestAddress).to.be.not.undefined;
        expect(rarestAddress).to.be.not.null;
    });

    it('CreateNFT and getting balance', async () => {
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

        //Return tokenId which should be equal to one
        expect(tokenId).to.equal(1);

        //Return balance must be equal to Amount
        const getNFT = await rarestnft.balanceOf(recipient, tokenId);
        expect(getNFT.toNumber()).to.equal(amount);
    });

    it('Marketplace should be approved for all', async () => {
        let [recipient]: string[] = await ethers.provider.listAccounts();
        let amount: number = 20;
        let hash: string = 'HASH';
        var data: string = '0x10';
        let royaltyRecipient: string = recipient;
        let royaltyPercent: number = 10;
        await rarestnft.createNFT(recipient, amount, hash, data, royaltyRecipient, royaltyPercent);
        const approval = await rarestnft.isApprovedForAll(recipient, marketAddress);
        expect(approval).to.equal(true);
    });

    it('Should return right URI', async () => {
        let [recipient] = await ethers.provider.listAccounts();
        let amount = 20;
        let hash = 'HASH';
        var data = '0x10';
        let royaltyRecipient = recipient;
        let royaltyPercent = 10;
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
        const uri: string = await rarestnft.uri(tokenId);
        expect(uri).to.equal(baseURI + hash);
    });
});
