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
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY ?? ''], // 0x793cE628DB6691c4C357eCbA4a5D3774CDCA4EA0
    },
    // rootstack: {
    //   url: 'https://rootstock.drpc.org',
    //   // url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    // },
    // testnet: {
    //   url: 'https://public-node.testnet.rsk.co',
    // },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
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
