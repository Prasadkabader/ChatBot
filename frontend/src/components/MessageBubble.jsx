import { motion } from 'framer-motion';

export default function MessageBubble({ message, index }) {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
        }`}>
          {isUser ? '👤' : '🤖'}
        </div>
        
        {/* Message */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-4 py-3 rounded-2xl shadow-lg ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
              : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}