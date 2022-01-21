const {ethers} = require('hardhat');
const fs = require('fs');

async function main() {
    const ERC1155Market = await ethers.getContractFactory('ERC1155Market');
    const erc1155market = await ERC1155Market.deploy();
    await erc1155market.deployed();
    console.log('ERC1155Market deployed to:', erc1155market.address);

    const marketplaceAddress = erc1155market.address;

    const RarestNft = await ethers.getContractFactory('RarestNft');
    const rarestnft = await RarestNft.deploy(marketplaceAddress);
    await rarestnft.deployed();
    console.log('RarestNft deployed to:', rarestnft.address);

    let config = `export const ERC1155Market = "${erc1155market.address}"
    export const rarestnft = "${rarestnft.address}"
    `;

    fs.writeFileSync('config.js', config);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
