import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';
import { Wallet } from '../types';

// Fix: Initialize GoogleGenAI client as per guidelines, assuming API_KEY is available from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });


const sendCryptoFunctionDeclaration: FunctionDeclaration = {
  name: 'sendCrypto',
  description: 'Sends one or more crypto payments in ALGO.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      payments: {
        type: Type.ARRAY,
        description: 'A list of payments to be made.',
        items: {
          type: Type.OBJECT,
          properties: {
            amount: {
              type: Type.NUMBER,
              description: 'The amount of ALGO to send.',
            },
            recipient: {
              type: Type.STRING,
              description: 'The recipient address or alias (e.g., alice.algo, bob.algo).',
            },
          },
          required: ['amount', 'recipient'],
        },
      },
    },
    required: ['payments'],
  },
};

const checkBalanceFunctionDeclaration: FunctionDeclaration = {
    name: 'checkBalance',
    description: 'Checks the current wallet balance.',
    parameters: {
        type: Type.OBJECT,
        properties: {},
    }
};

interface RavanResponse {
    message: string;
    newBalance?: number;
}

export const getRavanResponse = async (prompt: string, wallet: Wallet | null): Promise<RavanResponse> => {
    if (!wallet) return { message: 'Error: Wallet not connected.' };
    
    // Fix: Removed mock logic fallback to use Gemini API directly as per guidelines.
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ functionDeclarations: [sendCryptoFunctionDeclaration, checkBalanceFunctionDeclaration] }],
            },
        });
        
        if (response.functionCalls && response.functionCalls.length > 0) {
            const fc = response.functionCalls[0];
            if (fc.name === 'sendCrypto') {
                const { payments } = fc.args as { payments: { amount: number; recipient: string }[] };
                let totalAmount = 0;
                payments.forEach(p => totalAmount += p.amount);

                if (wallet.balance < totalAmount) {
                    return { message: `❌ Transaction failed. Insufficient funds. You need ${totalAmount} ALGO but only have ${wallet.balance.toFixed(2)} ALGO.` };
                }

                const newBalance = wallet.balance - totalAmount;
                const recipients = payments.map(p => `${p.amount} ALGO to ${p.recipient}`).join('\n- ');
                const message = `✅ Transaction successful!\n\nSent:\n- ${recipients}\n\nNew balance: ${newBalance.toFixed(2)} ALGO`;
                return { message, newBalance };
            }
             if (fc.name === 'checkBalance') {
                return { message: `Your current balance is ${wallet.balance.toFixed(2)} ALGO.` };
            }
        }

        // If no function call, return the text response
        return { message: response.text || "Sorry, I couldn't understand that." };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return { message: 'An error occurred while communicating with the AI. Please try again.' };
    }
};