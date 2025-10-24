import algosdk from 'algosdk';
import { config } from '../config';
import { Transaction } from '../types';

const ALGO_DECIMALS = 6;

class AlgorandService {
  private algodClient: algosdk.Algodv2;
  private indexerClient: algosdk.Indexer;
  private demoAccount: algosdk.Account | null = null;
  private userAccount: algosdk.Account | null = null;

  constructor() {
    this.algodClient = new algosdk.Algodv2('', config.algorand.apiUrl, '');
    this.indexerClient = new algosdk.Indexer('', config.algorand.indexerUrl, '');

    if (config.demoWallet.mnemonic && config.demoWallet.mnemonic !== 'YOUR_25_WORD_MNEMONIC_HERE') {
      try {
        this.demoAccount = algosdk.mnemonicToSecretKey(config.demoWallet.mnemonic);
        console.log('✅ Demo wallet initialized successfully');
      } catch (error) {
        console.error('Failed to initialize demo wallet from mnemonic:', error);
        console.log('⚠️  Running in demo mode without wallet capabilities');
      }
    } else {
      console.log('⚠️  No demo wallet configured - running in read-only mode');
    }
  }

  public setUserAccount(mnemonic: string) {
    try {
      this.userAccount = algosdk.mnemonicToSecretKey(mnemonic);
      console.log('✅ User account set successfully');
    } catch (error) {
      console.error('Failed to set user account from mnemonic:', error);
      this.userAccount = null;
      throw new Error('Invalid mnemonic phrase');
    }
  }

  public getDemoWalletAddress(): string {
    return this.demoAccount ? this.demoAccount.addr : '';
  }

  public isValidAddress(address: string): boolean {
    return algosdk.isValidAddress(address);
  }

  public async getBalance(address: string): Promise<number> {
    const accountInfo = await this.algodClient.accountInformation(address).do();
    return accountInfo.amount / 10 ** ALGO_DECIMALS;
  }

  public async getTransactionHistory(address: string, limit = 10): Promise<Transaction[]> {
    const response = await this.indexerClient.lookupAccountTransactions(address).limit(limit).do();
    return response.transactions.map((tx: any) => ({
      id: tx.id,
      type: tx['tx-type'],
      sender: tx.sender,
      recipient: tx['payment-transaction']?.receiver || '',
      amount: (tx['payment-transaction']?.amount || 0) / 10 ** ALGO_DECIMALS,
      fee: tx.fee / 10 ** ALGO_DECIMALS,
      note: tx.note ? Buffer.from(tx.note, 'base64').toString() : undefined,
      round: tx['confirmed-round'],
      timestamp: tx['round-time'],
    }));
  }

  public async sendTransaction(to: string, amount: number, note?: string): Promise<{ txId: string }> {
    // Use user account if available, otherwise demo account
    const account = this.userAccount || this.demoAccount;
    if (!account) {
      throw new Error('No wallet configured for sending transactions.');
    }

    const from = account.addr;
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    const amountInMicroAlgos = Math.floor(amount * 10 ** ALGO_DECIMALS);

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      to,
      amount: amountInMicroAlgos,
      suggestedParams,
      note: note ? new Uint8Array(Buffer.from(note)) : undefined,
    });

    const signedTxn = txn.signTxn(account.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    await algosdk.waitForConfirmation(this.algodClient, txId, 4);

    return { txId };
  }
}

export const algorandService = new AlgorandService();
