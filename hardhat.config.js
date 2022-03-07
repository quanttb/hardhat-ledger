require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@openzeppelin/hardhat-upgrades');

const config = require('./env.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    testnet: {
      url: config.TESTNET_RPC,
      chainId: config.TESTNET_CHAIN_ID,
    },
    mainnet: {
      url: config.MAINNET_RPC,
      chainId: config.MAINNET_CHAIN_ID,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: config.ETHERSCAN_API_KEY,
  },
};
