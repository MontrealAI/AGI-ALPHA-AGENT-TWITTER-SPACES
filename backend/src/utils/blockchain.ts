// This module connects to the Solana blockchain using @solana/web3.js
// to interact with the already deployed $AGIALPHA token.
import { Connection, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

let connection: Connection;

export function initBlockchain(): void {
  const rpcUrl = process.env.SOLANA_RPC_URL;
  if (!rpcUrl) {
    throw new Error('SOLANA_RPC_URL is not defined in your environment variables.');
  }
  connection = new Connection(rpcUrl, 'confirmed');
  console.log('Connected to the Solana blockchain.');
}

export function getConnection(): Connection {
  if (!connection) {
    initBlockchain();
  }
  return connection;
}

/**
 * Retrieve the $AGIALPHA token balance for a given wallet address.
 * In production, replace the simulated logic with actual SPL Token methods.
 */
export async function getAGIALPHABalance(walletAddress: string): Promise<number> {
  const connection = getConnection();
  const tokenAddress = process.env.AGIALPHA_TOKEN_ADDRESS;
  if (!tokenAddress) {
    throw new Error('$AGIALPHA_TOKEN_ADDRESS is not defined in your environment variables.');
  }
  const wallet = new PublicKey(walletAddress);
  const tokenPubkey = new PublicKey(tokenAddress);
  
  // Simulate token balance retrieval. Replace with actual SPL Token balance retrieval logic.
  const simulatedBalance = 1000;
  console.log(`Wallet ${walletAddress} holds ${simulatedBalance} $AGIALPHA tokens.`);
  return simulatedBalance;
}
