import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CollateralAndBorrow from './pages/CollateralAndBorrow';
import Send from './pages/Send';
import Rewards from './pages/Rewards';
import Withdrawal from './pages/Withdrawal';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collateral-and-borrow" element={<CollateralAndBorrow />} />
        <Route path="/send" element={<Send />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;