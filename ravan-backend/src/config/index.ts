import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  algorand: {
    apiUrl: process.env.ALGORAND_API_URL || 'https://testnet-api.algonode.cloud',
    indexerUrl: process.env.ALGORAND_INDEXER_URL || 'https://testnet-idx.algonode.cloud',
  },
  demoWallet: {
    mnemonic: process.env.DEMO_WALLET_MNEMONIC || '',
    address: process.env.DEMO_WALLET_ADDRESS || 'GQCGVTCORNYT7TH5AES7FEV7O2YUGC6LYWD4L6LDCXXMGJJHXCUQYAGUVE',
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY || '',
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
  },
};
