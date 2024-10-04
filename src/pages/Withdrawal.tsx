import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function Withdrawal() {
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const contract = useContract();

  const handleWithdraw = async () => {
    try {
      const withdrawAmount = parseFloat(amount);
      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      if (accountNumber.length !== 10 || !/^\d+$/.test(accountNumber)) {
        toast.error('Please enter a valid 10-digit account number');
        return;
      }

      if (bankName.trim() === '') {
        toast.error('Please enter a bank name');
        return;
      }

      await contract.withdrawNaira(withdrawAmount, parseInt(accountNumber), bankName);
      toast.success(`Successfully withdrew ${withdrawAmount} NAIRA to your bank account`);
      setAmount('');
      setAccountNumber('');
      setBankName('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Withdrawal failed: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Withdraw to Bank Account</h1>
        <motion.div
          className="max-w-md mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (NAIRA)"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
            />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
            />
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
            />
            <button
              onClick={handleWithdraw}
              className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}