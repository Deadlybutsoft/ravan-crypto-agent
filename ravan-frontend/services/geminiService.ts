// Frontend service to communicate with backend API
import { Wallet } from '../types';

interface RavanResponse {
    message: string;
    newBalance?: number;
}

export const getRavanResponse = async (prompt: string, wallet: Wallet | null): Promise<RavanResponse> => {
    if (!wallet) return { message: 'Error: Wallet not connected.' };

    try {
        // Call backend API instead of Gemini directly
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: prompt,
                walletAddress: wallet.address
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            message: data.response,
            newBalance: wallet.balance // Keep local balance for now
        };

    } catch (error) {
        console.error("Error calling backend API:", error);
        return { message: 'An error occurred while communicating with the AI. Please try again.' };
    }
};
