
export type Page = 'main' | 'connect' | 'chat';

export interface ChatMessage {
  id: number;
  sender: 'user' | 'agent' | 'system';
  text: string;
  isTyping?: boolean;
}

export interface Wallet {
    address: string;
    balance: number;
}