import { motion } from "framer-motion";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      alert("Registration successful! Please login to continue.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
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
            Join Our
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Community{" "}
            </span>
            Today
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Start building amazing chatbots and join thousands of developers creating the future of AI communication.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">✨</span>
              <span>Free to get started</span>
            </div>
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">🔒</span>
              <span>Secure and private</span>
            </div>
            <div className="flex items-center text-white/70">
              <span className="text-2xl mr-3">🌟</span>
              <span>Premium features included</span>
            </div>
          </div>
        </motion.div>

        {/* Right side - Register form */}
        <div className="w-full lg:w-96">
          <AuthForm onSubmit={handleRegister} isLogin={false} />
        </div>
      </div>
    </div>
  );
}