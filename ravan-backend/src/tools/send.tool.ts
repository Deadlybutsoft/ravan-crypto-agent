import { createTool } from '@iqai/adk';
import * as z from 'zod';
import { algorandService } from '../services/algorand.service';

export const sendTool = createTool({
  name: 'send_algo',
  description: 'Send ALGO to a given Algorand address.',
  schema: z.object({
    to: z.string().describe('The Algorand address of the recipient.'),
    amount: z.number().describe('The amount of ALGO to send.'),
    note: z.string().optional().describe('An optional note to include with the transaction.'),
  }),
  fn: async ({ to, amount, note }) => {
    if (!algorandService.isValidAddress(to)) {
      return { error: 'Invalid recipient address format.' };
    }

    const senderAddress = algorandService.getDemoWalletAddress();
    if (!senderAddress) {
      return { error: 'Demo wallet is not configured.' };
    }

    try {
      const balance = await algorandService.getBalance(senderAddress);
      if (balance < amount) {
        return { error: `Insufficient balance. Current balance is ${balance} ALGO.` };
      }

      const { txId } = await algorandService.sendTransaction(to, amount, note);
      const explorerUrl = `https://testnet.algoexplorer.io/tx/${txId}`;

      return {
        txId,
        explorerUrl,
        message: `Successfully sent ${amount} ALGO to ${to}.`,
      };
    } catch (error) {
      console.error('Error sending transaction:', error);
      return { error: 'Failed to send transaction.' };
    }
  },
});
