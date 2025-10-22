import { z } from 'zod';
import { algorandService } from '../services/algorand.service';

const historyParameters = z.object({
  address: z.string().describe('The Algorand address to check the history of.'),
  limit: z.number().optional().describe('The maximum number of transactions to return.'),
});

export const historyTool = {
  name: 'get_transaction_history',
  description: 'Get the transaction history for a given Algorand address.',
  parameters: historyParameters,
  execute: async (input: z.infer<typeof historyParameters>) => {
    const { address, limit } = input;
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
};
