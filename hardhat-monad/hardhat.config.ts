// hardhat.config.ts

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
      version: "0.8.19",
      settings: {
        evmVersion: 'paris',
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  networks: {
    monadTestnet: {
      url: process.env.RPC_URL || "https://testnet.rpc.monad.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 10143,
    },
  },
  sourcify: {
    // Tetap aktifkan Sourcify
    enabled: true
  },
  etherscan: {
    // Kita tetap membutuhkan blok ini untuk mendefinisikan custom chain
    apiKey: {
        // API Key tidak diperlukan untuk Sourcify, tapi blok ini perlu ada
        "monadTestnet": "no-api-key" 
    },
    customChains: [
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          // Arahkan ke API Sourcify khusus Monad
          apiURL: "https://sourcify-api-monad.blockvision.org/api/server", // Sesuaikan dengan path API yang benar jika perlu
          browserURL: "https://testnet.monadexplorer.com"
        }
      }
    ]
  }
};

export default config;