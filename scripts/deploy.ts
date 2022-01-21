const {ethers} = require('hardhat');
const fs = require('fs');

async function main() {
    const RarestNft = await ethers.getContractFactory('RarestNft');
    const marketplaceAddress = '0x18B820C66704AD3507AF3fbE1634cCC67EcdE49d';
    const rarestnft = await RarestNft.deploy(marketplaceAddress);
    await rarestnft.deployed();
    console.log('RarestNft deployed to:', rarestnft.address);

    let config = `export const rarestnft = "${rarestnft.address}"`;

    fs.writeFileSync('config.js', config);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
