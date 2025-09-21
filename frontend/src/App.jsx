import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        {token && <Navbar />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route 
              path="/" 
              element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!token ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!token ? <Register /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={token ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/project/:projectId" 
              element={token ? <Project /> : <Navigate to="/login" />} 
            />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;