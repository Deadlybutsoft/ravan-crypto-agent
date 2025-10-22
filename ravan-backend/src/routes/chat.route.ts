import { Hono } from 'hono';
import { z } from 'zod';
import { ravanAgent } from '../agent/ravan-agent';

const router = new Hono();

const chatRequestSchema = z.object({
  message: z.string(),
  walletAddress: z.string().optional(),
});

// POST /api/chat
router.post('/chat', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = chatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({ error: 'Invalid request body' }, 400);
    }

    const { message, walletAddress } = parseResult.data;

    // Handle empty message (greeting)
    if (!message.trim()) {
      return c.json({
        response: 'Greetings! I am Ravan, your AI Crypto Commander. I can help you check your balance, send ALGO, and view transaction history on the Algorand blockchain. What would you like to do?',
      });
    }

    // TODO: Integrate with AI agent when API is fixed
    // For now, return mock responses
    let response = '';

    if (message.toLowerCase().includes('balance')) {
      response = 'Your current balance is 5.5 ALGO. This is a demo response - AI integration WIP.';
    } else if (message.toLowerCase().includes('send')) {
      response = 'Transaction sent successfully. TX ID: ABC123XYZ. Explorer: https://testnet.algoexplorer.io/tx/ABC123XYZ';
    } else if (message.toLowerCase().includes('history') || message.toLowerCase().includes('transaction')) {
      response = 'Your last 5 transactions: 1. Sent 2 ALGO to user.algo, 2. Received 1 ALGO from shop.algo, etc.';
    } else {
      response = `I understand your request: "${message}". Ravan AI is still being configured - please check back soon!`;
    }

    return c.json({
      response,
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { router as chatRouter };
