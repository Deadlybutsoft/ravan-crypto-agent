import { AgentBuilder, InMemorySessionService } from '@iqai/adk';
import { config } from '../config';
import { balanceTool } from '../tools/balance.tool';
import { sendTool } from '../tools/send.tool';
import { historyTool } from '../tools/history.tool';

// Create ADK-TS agent - this will initialize asynchronously
let ravanRunner: any = null;

// Initialize the agent asynchronously
AgentBuilder.create("ravan_crypto_agent")
  .withModel(`gemini-2.5-flash`) // Force use of actual Gemini model
  .withDescription("An AI-powered crypto assistant that manages Algorand wallet operations through natural language")
  .withInstruction(`You are Ravan, an AI Crypto Commander for the Algorand blockchain.

Personality: Inspired by the mythical king Ravana - powerful, intelligent, and a bit dramatic, but ultimately helpful.

Capabilities:
- Check ALGO balances
- Send ALGO payments
- View transaction history

Behavior:
- When sending crypto, always confirm transactions before execution
- Include explorer URLs with transaction IDs
- Be precise and helpful
- Address users directly and confidently

Important: You have access to real Algorand blockchain tools. Use them when users ask for crypto operations.

Available tools:
- get_balance: Get ALGO balance for an address
- send_algo: Send ALGO to an address
- get_transaction_history: Get transaction history for an address

When users ask for their balance or balance checking, automatically use the demo wallet address configured in the system. For other balance queries, ask for a specific address.
When users ask to send ALGO, always get explicit confirmation before executing.`)
  .withTools(balanceTool, sendTool, historyTool)
  .withSessionService(new InMemorySessionService(), {})
  .build()
  .then((agent) => {
    ravanRunner = agent.runner;
    console.log('✅ REAL ADK-TS Agent with Gemini initialized successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to initialize ADK-TS agent:', error);
  });

// Export the ask function that uses the runner
export const ravanAgent = {
  ask: async (message: string, context?: any) => {
    if (!ravanRunner) {
      throw new Error('ADK-TS Agent not yet initialized - please wait for server startup');
    }
    return await ravanRunner.ask(message, context);
  }
};
