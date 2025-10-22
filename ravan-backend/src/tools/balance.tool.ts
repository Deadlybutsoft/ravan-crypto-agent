import { z } from 'zod';
import { algorandService } from '../services/algorand.service';

const balanceParameters = z.object({
  address: z.string().describe('The Algorand address to check the balance of.'),
});

export const balanceTool = {
  name: 'get_balance',
  description: 'Get the ALGO balance for a given Algorand address.',
  parameters: balanceParameters,
  execute: async (input: z.infer<typeof balanceParameters>) => {
    const { address } = input;
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
};
