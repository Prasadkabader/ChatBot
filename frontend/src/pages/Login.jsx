import { motion } from "framer-motion";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);
      login(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center lg:justify-between">
        {/* Left side - Welcome text (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block flex-1 pr-12"
        >
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to the
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Future{" "}
            </span>
            of AI Chat
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Create intelligent chatbots, manage conversations, and unlock the power of AI-driven communication.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">🚀</span>
              <span>Lightning-fast AI responses</span>
            </div>
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">🎯</span>
              <span>Customizable chat experiences</span>
            </div>
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">📊</span>
              <span>Advanced analytics and insights</span>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-96">
          <AuthForm onSubmit={handleLogin} isLogin={true} />
        </div>
      </div>
    </div>
  );
}