const { ethers } = require('hardhat');
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require('../constants');

async function main() {
	// Deploy the FakeNFTMarketplace contract first
	// 1. Create the instance
	const FakeNFTMarketplace = await ethers.getContractFactory(
		'FakeNFTMarketplace'
	);
	// 2. deploy the instance
	const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
	// 3. Confirm instance deployment
	await fakeNftMarketplace.deployed();

	// Deployed contract address fakeNFTMarketPlace
	console.log('FakeNFTMarketplace deployed to: ', fakeNftMarketplace.address);

	// Now deploy the CryptoDevsDAO contract
	// 1. Create the instance
	const CryptoDevsDAO = await ethers.getContractFactory('CryptoDevsDAO');
	// 2. deploy the instance
	/*
    Point the dao to the fakeNftMarketPlace
    CRYPTODEVS_NFT_CONTRACT_ADDRESS to determine which addresses are eligible to vote/participate in dao
  */
	const cryptoDevsDAO = await CryptoDevsDAO.deploy(
		fakeNftMarketplace.address,
		CRYPTODEVS_NFT_CONTRACT_ADDRESS,
		{
			// This assumes your account has at least 1 ETH in it's account
			// Change this value as you want. Initial value to fund DAO
			value: ethers.utils.parseEther('0.001'),
		}
	);
	// 3. Confirm instance deployment
	await cryptoDevsDAO.deployed();

	// Deployed contract address cryptoDao
	console.log('CryptoDevsDAO deployed to: ', cryptoDevsDAO.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
