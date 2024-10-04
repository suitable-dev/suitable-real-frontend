import React, { useState, useEffect } from 'react';
import { useContract } from '../hooks/useContract';
import { motion } from 'framer-motion';
import Header from '../components/Header';

type Transaction = {
  type: string;
  amount: string;
  timestamp: string;
};

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const contract = useContract();

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const history = await contract.getTransactionHistory();
      setTransactions(history);
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Transaction History</h1>
        <motion.div
          className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center border-b border-gray-600 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span>{transaction.type}</span>
                <span>{transaction.amount}</span>
                <span className="text-sm text-gray-400">{new Date(transaction.timestamp).toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
          {transactions.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No transactions found.</p>
          )}
          <button
            onClick={fetchTransactionHistory}
            className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Refresh History
          </button>
        </motion.div>
      </div>
    </div>
  );
}