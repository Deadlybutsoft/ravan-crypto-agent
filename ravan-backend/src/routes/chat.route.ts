import { Hono } from 'hono';
import { z } from 'zod';
import { ravanAgent } from '../agent/ravan-agent';
import { algorandService } from '../services/algorand.service';

const router = new Hono();

const chatRequestSchema = z.object({
  message: z.string(),
  walletAddress: z.string().optional(),
  mnemonic: z.string().optional(),
});

// POST /api/chat
router.post('/chat', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = chatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({ error: 'Invalid request body' }, 400);
    }

    const { message, walletAddress, mnemonic } = parseResult.data;

    // Handle empty message (greeting)
    if (!message.trim()) {
      return c.json({
        response: 'Greetings! I am Ravan, your AI Crypto Commander. I can help you check your balance, send ALGO, and view transaction history on the Algorand blockchain. What would you like to do?',
      });
    }

    // Set user account if mnemonic provided
    if (mnemonic) {
      algorandService.setUserAccount(mnemonic);
    }

    // Process the message through the ADK-TS AI agent
    const result = await ravanAgent.ask(message);

    return c.json({
      response: result,
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { router as chatRouter };
