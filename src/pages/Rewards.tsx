import React, { useState, useEffect } from 'react';
import { useContract } from '../hooks/useContract';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function Rewards() {
  const [dexBalance, setDexBalance] = useState(0);
  const [points, setPoints] = useState<number>(0);
  const [nfts, setNfts] = useState<string[]>([]);
  const contract = useContract();

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const fetchRewardsData = async () => {
    try {
      const balance = await contract.getDexBalance();
      setDexBalance(balance);
      // Fetch points and NFTs from the loyalty contract
      // This is a placeholder and should be implemented based on your contract
      setPoints(15);
      setNfts(['NFT1', 'NFT2']);
    } catch (error) {
      console.error('Failed to fetch rewards data:', error);
    }
  };

  const handleStake = async () => {
    try {
      // Implement staking logic
      toast.success('Successfully staked DEX tokens');
      await fetchRewardsData();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Staking failed: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const handleGetReward = async () => {
    try {
      // Implement get_reward logic
      toast.success('Successfully claimed NFT reward');
      await fetchRewardsData();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Claiming reward failed: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Rewards & Loyalty</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">DEX Rewards</h2>
            <p>Your DEX Token Balance: {dexBalance}</p>
            <p>Loyalty Points: {points}</p>
            <button
              onClick={handleStake}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Stake DEX Tokens
            </button>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">NFT Rewards</h2>
            <p>Your NFTs:</p>
            <ul className="list-disc list-inside">
              {nfts.map((nft, index) => (
                <li key={index}>{nft}</li>
              ))}
            </ul>
            <button
              onClick={handleGetReward}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
              disabled={points < 5}
            >
              Claim NFT Reward (5 points)
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}