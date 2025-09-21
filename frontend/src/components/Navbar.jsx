import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          🤖 ChatBot Platform
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}