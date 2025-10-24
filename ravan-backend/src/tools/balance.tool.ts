import { createTool } from '@iqai/adk';
import * as z from 'zod';
import { algorandService } from '../services/algorand.service';

export const balanceTool = createTool({
  name: 'get_balance',
  description: 'Get the ALGO balance for a given Algorand address. If no address provided, uses demo wallet.',
  schema: z.object({
    address: z.string().optional().describe('The Algorand address to check the balance of. Uses demo wallet if not provided.'),
  }),
  fn: async ({ address }) => {
    // Use provided address or fall back to demo wallet address
    const walletAddress = address || algorandService.getDemoWalletAddress();

    if (!walletAddress) {
      return { error: 'No demo wallet configured and no address provided.' };
    }

    if (!algorandService.isValidAddress(walletAddress)) {
      return { error: 'Invalid address format.' };
    }

    try {
      const balance = await algorandService.getBalance(walletAddress);
      return {
        balance,
        balanceFormatted: `${balance.toLocaleString()} ALGO`,
        address: walletAddress,
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      return { error: 'Failed to retrieve balance.' };
    }
  },
});
