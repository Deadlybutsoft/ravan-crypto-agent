import { createTool } from '@iqai/adk';
import * as z from 'zod';
import { algorandService } from '../services/algorand.service';

export const historyTool = createTool({
  name: 'get_transaction_history',
  description: 'Get the transaction history for a given Algorand address.',
  schema: z.object({
    address: z.string().describe('The Algorand address to check the history of.'),
    limit: z.number().optional().describe('The maximum number of transactions to return.'),
  }),
  fn: async ({ address, limit }) => {
    if (!algorandService.isValidAddress(address)) {
      return { error: 'Invalid address format.' };
    }
    try {
      const transactions = await algorandService.getTransactionHistory(address, limit);
      return { transactions };
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return { error: 'Failed to retrieve transaction history.' };
    }
  },
});
