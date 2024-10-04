import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContract } from '../hooks/useContract';
import Header from '../components/Header';


export default function Dashboard() {
  const contract = useContract();
  const [assets, setAssets] = React.useState({ ETH: 0, NAIRA: 0, DEX: 0 });

  React.useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const ethBalance = await contract.getEthBalance();
      const nairaBalance = await contract.getNairaBalance();
      const dexBalance = await contract.getDexBalance();
      setAssets({ ETH: ethBalance, NAIRA: nairaBalance, DEX: dexBalance });
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      <Header />
      <div className="p-8 max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Assets</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>ETH:</span>
                <span className="font-mono">{assets.ETH}</span>
              </p>
              <p className="flex justify-between">
                <span>NAIRA:</span>
                <span className="font-mono">{assets.NAIRA}</span>
              </p>
              <p className="flex justify-between">
                <span>DEX Tokens:</span>
                <span className="font-mono">{assets.DEX}</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link to="/collateral-and-borrow" className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                Collateral & Borrow
              </Link>
              <Link to="/send" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Send Fiat
              </Link>
              <Link to="/rewards" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Rewards & Loyalty
              </Link>
              <Link to="/withdrawal" className="block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors">
                Withdraw
              </Link>
              <Link to="/history" className="block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Transaction History
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>ETH/NAIRA:</span>
                <span className="font-mono">750,000</span>
              </p>
              <p className="flex justify-between">
                <span>DEX/NAIRA:</span>
                <span className="font-mono">100</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}