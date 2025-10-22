export interface Transaction {
  id: string;
  type: string;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  note?: string;
  round?: number;
  timestamp?: number;
}

export interface ChatRequest {
  message: string;
  walletAddress: string;
}

export interface ChatResponse {
  response: string;
  txId?: string;
  explorerUrl?: string;
}
