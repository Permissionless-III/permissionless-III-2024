import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

require('dotenv').config() // Import the dotenv package

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY ?? ''], // 0x793cE628DB6691c4C357eCbA4a5D3774CDCA4EA0
    },
    rskMainnet: {
      url: 'https://public-node.rsk.co',
      chainId: 30,
      gasPrice: 60000000,
      accounts: [process.env.PRIVATE_KEY ?? ''],
    },
    rskTestnet: {
      url: 'https://public-node.testnet.rsk.co',
      chainId: 31,
      gasPrice: 60000000,
      accounts: [process.env.PRIVATE_KEY ?? ''],
    },
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY ?? '',
      // Is not required by blockscout. Can be any non-empty string
      rskTestnet: 'RSK_TESTNET_RPC_URL',
      rskMainnet: 'RSK_MAINNET_RPC_URL',
    },
    customChains: [
      {
        network: 'rskTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://rootstock-testnet.blockscout.com/api/',
          browserURL: 'https://rootstock-testnet.blockscout.com/',
        },
      },
      {
        network: 'rskMainnet',
        chainId: 30,
        urls: {
          apiURL: 'https://rootstock.blockscout.com/api/',
          browserURL: 'https://rootstock.blockscout.com/',
        },
      },
    ],
  },
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
}

export default config
