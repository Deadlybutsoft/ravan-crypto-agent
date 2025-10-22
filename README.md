# Ravan - AI Crypto Commander

An AI-powered crypto wallet that allows natural language interactions with Algorand blockchain transactions.

## 🎯 Project Overview

Ravan is a conversational AI agent that manages Algorand cryptocurrency through natural language commands. Users can check balances, send ALGO, view transaction history, and interact with their wallet via a simple chat interface.

### ✨ Key Features
- **Natural Language Commands**: Send "Send 5 ALGO to alice.algo" instead of navigating complex UIs
- **Real Blockchain Transactions**: Powered by Algorand testnet
- **Secure Architecture**: Backend-controlled wallet operations
- **Responsive Design**: Works on desktop and mobile

### 🏗️ Architecture
```
User Browser -> React Frontend (Vercel) -> Hono API (Railway) -> ADK-TS Agent -> Algorand Tools -> Algorand Blockchain
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- GitHub account for deployment

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/ravan-project.git
cd ravan-project

# Install backend dependencies
cd ravan-backend
npm install

# Install frontend dependencies
cd ../ravan-frontend
npm install

# Back to root
cd ..
```

### 2. Setup Environment Variables

#### Backend (ravan-backend/.env)
```bash
PORT=3000
ALGORAND_API_URL=https://testnet-api.algonode.cloud
ALGORAND_INDEXER_URL=https://testnet-idx.algonode.cloud
DEMO_WALLET_MNEMONIC=YOUR_25_WORD_MNEMONIC_HERE
DEMO_WALLET_ADDRESS=YOUR_ALGORAND_ADDRESS_HERE
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY_HERE
ALLOWED_ORIGINS=http://localhost:5173,https://ravan-frontend.vercel.app
```

**Get Algorand Testnet Credentials:**
1. Visit https://testnet.algoexplorer.io/dispenser
2. Generate an account (25-word mnemonic + address)
3. Click "Dispense" to get free test ALGO

**Get Google Gemini API Key:**
1. Visit https://aistudio.google.com/app/apikey
2. Create API key for Gemini

#### Frontend (ravan-frontend/.env.local)
```bash
VITE_API_URL=http://localhost:3000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 3. Start Development

```bash
# Terminal 1: Backend
cd ravan-backend
npm run dev

# Terminal 2: Frontend
cd ravan-frontend
npm run dev

# Open http://localhost:5173
```

## 📦 Deployment

### Railway (Backend)
1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `ravan-project` repo
4. Set build settings:
   - **Root Directory**: `ravan-backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variables from `.env`
6. Deploy!

### Vercel (Frontend)
1. Create account at https://vercel.com
2. Click "New Project" → Import GitHub
3. Select your `ravan-project` repo
4. Set build settings:
   - **Root Directory**: `ravan-frontend`
   - **Framework Preset**: Vite
   - **Build Settings**:
     - Install Command: `npm install`
     - Build Command: `npm run build`
     - Output Directory: `dist`
5. Add environment variables:
   - `VITE_API_URL=YOUR_RAILWAY_BACKEND_URL`
6. Deploy!

### Update Frontend API URL
After Railway deployment, update frontend environment:
```bash
VITE_API_URL=https://your-railway-backend.railway.app
```

## 🎮 Usage Examples

Ravan understands natural language commands. Try:

- "What's my balance?"
- "Send 1 ALGO to receiver.algo"
- "Show my last 10 transactions"
- "What's the current status of transaction ABC123?"

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Hono + Node.js + TypeScript
- **AI**: Google Gemini + ADK-TS framework
- **Blockchain**: Algorand SDK (testnet)
- **Deployment**: Vercel + Railway

## 🔐 Security Notes

- **Demo Wallet**: The backend uses a single demo wallet for all users (simplified for hackathon)
- **Testnet Only**: All transactions are on Algorand testnet (no real value)
- **Local Development**: Environment variables contain sensitive keys - never commit to git

## 🐛 Troubleshooting

### Backend won't start
- Check `.env` file exists with valid credentials
- Ensure Algorand mnemonic is exactly 25 words
- Verify Google API key is active

### Frontend can't connect to backend
- Confirm `VITE_API_URL` points to correct backend URL
- Check CORS settings in backend `.env`

### Transactions failing
- Ensure demo wallet has enough test ALGO
- Visit https://testnet.algoexplorer.io/ to check transaction status

## 🎯 Hackathon Requirements Met

- **Web3 Innovation**: Natural language blockchain interactions
- **Algorand Integration**: Full SDK implementation with real transactions
- **AI/ML**: Conversational interface powered by Gemini
- **User Experience**: Intuitive chat-based wallet interface
- **Scalability**: Modular architecture ready for production

## 📄 License

MIT License - feel free to fork and build upon!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

---

Built with ❤️ for ADK-TS Hackathon 2025 - Track 3 (Web3 Use Cases)
