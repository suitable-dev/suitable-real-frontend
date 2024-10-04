import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function Header() {
  return (
    <motion.header 
      className="bg-purple-900 bg-opacity-50 backdrop-blur-md shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.png" alt="LendEX" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link to="/collateral-and-borrow" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Collateral & Borrow</Link>
                <Link to="/send" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Send</Link>
                <Link to="/rewards" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Rewards</Link>
                <Link to="/withdrawal" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Withdraw</Link>
                <Link to="/history" className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">History</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-purple-800 p-1 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}