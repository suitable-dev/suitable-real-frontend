import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function CollateralAndBorrow() {
  const [collateralAmount, setCollateralAmount] = useState('');
  const [collateralType, setCollateralType] = useState('ETH');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [borrowType, setBorrowType] = useState('NAIRA');
  const contract = useContract();

  const handleDeposit = async () => {
    try {
      const amount = parseFloat(collateralAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      if (collateralType === 'ETH') {
        await contract.depositEth(amount);
      } else {
        await contract.depositNaira(amount);
      }

      toast.success(`Successfully deposited ${amount} ${collateralType}`);
      setCollateralAmount('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to deposit: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const handleBorrow = async () => {
    try {
      const amount = parseFloat(borrowAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      if (borrowType === 'ETH') {
        await contract.borrowEth(amount);
      } else {
        await contract.borrowNaira(amount);
      }

      toast.success(`Successfully borrowed ${amount} ${borrowType}`);
      setBorrowAmount('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to borrow: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Collateral & Borrow</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Deposit Collateral</h2>
            <div className="space-y-4">
              <input
                type="number"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(e.target.value)}
                placeholder="Amount"
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
              />
              <select
                value={collateralType}
                onChange={(e) => setCollateralType(e.target.value)}
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white"
              >
                <option value="ETH">ETH</option>
                <option value="NAIRA">NAIRA</option>
              </select>
              <button
                onClick={handleDeposit}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Deposit
              </button>
            </div>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Borrow</h2>
            <div className="space-y-4">
              <input
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                placeholder="Amount"
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300"
              />
              <select
                value={borrowType}
                onChange={(e) => setBorrowType(e.target.value)}
                className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-white"
              >
                <option value="ETH">ETH</option>
                <option value="NAIRA">NAIRA</option>
              </select>
              <button
                onClick={handleBorrow}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Borrow
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}