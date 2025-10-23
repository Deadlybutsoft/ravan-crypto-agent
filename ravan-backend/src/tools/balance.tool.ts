import { createTool } from '@iqai/adk';
import * as z from 'zod';
import { algorandService } from '../services/algorand.service';

export const balanceTool = createTool({
  name: 'get_balance',
  description: 'Get the ALGO balance for a given Algorand address.',
  schema: z.object({
    address: z.string().describe('The Algorand address to check the balance of.'),
  }),
  fn: async ({ address }) => {
    if (!algorandService.isValidAddress(address)) {
      return { error: 'Invalid address format.' };
    }
    try {
      const balance = await algorandService.getBalance(address);
      return {
        balance,
        balanceFormatted: `${balance.toLocaleString()} ALGO`,
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      return { error: 'Failed to retrieve balance.' };
    }
  },
});
