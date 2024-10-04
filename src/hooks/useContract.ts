import { Transaction } from '@mysten/sui/transactions';
import { useWallet } from '@suiet/wallet-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { bcs } from '@mysten/sui/bcs'

const CONTRACT_ADDRESS = process.env.REACT_APP_DEX_CONTRACT_ADDRESS;
const provider = new SuiClient({ url: `https://fullnode.${process.env.REACT_APP_SUI_NETWORK}.sui.io` });

export function useContract() {
  const { signAndExecuteTransaction } = useWallet();

  const executeTransaction = async (transactionFunction: (tx: Transaction) => void) => {
    try {
      const tx = new Transaction();
      transactionFunction(tx);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      return result;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  const getEthBalance = async () => {
    // Implement balance fetching logic
    return 0; // Placeholder
  };

  const getNairaBalance = async () => {
    // Implement balance fetching logic
    return 0; // Placeholder
  };

  const getDexBalance = async () => {
    // Implement balance fetching logic
    return 0; // Placeholder
  };

  const depositEth = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::deposit_eth`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const depositNaira = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::deposit_naira`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const borrowNaira = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::borrow_naira`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const borrowEth = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::borrow_eth`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const repayNaira = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::repay_naira`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const repayEth = async (amount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::repay_eth`,
        arguments: [tx.pure(bcs.U64.serialize(amount))],
      });
    });
  };

  const swapEthForNaira = async (ethAmount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::send_eth_receive_naira`,
        arguments: [tx.pure(bcs.U64.serialize(ethAmount))],
      });
    });
  };

  const swapNairaForEth = async (nairaAmount: number) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::send_naira_receive_eth`,
        arguments: [tx.pure(bcs.U64.serialize(nairaAmount))],
      });
    });
  };

  const withdrawNaira = async (amount: number, accountNumber: number, bankName: string) => {
    return executeTransaction((tx) => {
      tx.moveCall({
        target: `${CONTRACT_ADDRESS}::dex::withdraw_naira`,
        arguments: [tx.pure(bcs.U64.serialize(amount)), tx.pure(bcs.U64.serialize(accountNumber)), tx.pure(bcs.U64.serialize(bankName))],
      });
    });
  };

  const getTransactionHistory = async () => {
    // Implement transaction history fetching logic
    return []; // Placeholder
  };

  return {
    getEthBalance,
    getNairaBalance,
    getDexBalance,
    depositEth,
    depositNaira,
    borrowNaira,
    borrowEth,
    repayNaira,
    repayEth,
    swapEthForNaira,
    swapNairaForEth,
    withdrawNaira,
    getTransactionHistory,
  };
}