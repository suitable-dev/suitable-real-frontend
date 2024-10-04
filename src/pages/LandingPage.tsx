import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ZkLoginComponent from '../components/ZkLogin';


export default function LandingPage() {
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   // Implement ZK login with Google OAuth here
  //   // For now, we'll just navigate to the dashboard
   
  //   // navigate('/dashboard');
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-8 text-white">Welcome to LendEX</h1>
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Experience the future of decentralized finance with our cutting-edge lending and borrowing platform.
        </p>
         <ZkLoginComponent />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500 to-green-500 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
      />
    </div>
  );
}