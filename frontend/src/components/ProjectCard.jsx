import { motion } from 'framer-motion';

export default function ProjectCard({ project, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer border border-white/20 hover:border-white/40 transition-all duration-300 group"
      onClick={() => onSelect(project)}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-xl font-bold">
            {project.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-white/60 text-sm">
            {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <p className="text-white/80 text-sm mb-4 line-clamp-3">
        {project.description || "No description available"}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
          {project.model}
        </span>
        <motion.div
          whileHover={{ x: 5 }}
          className="text-white/60 group-hover:text-white transition-colors duration-200"
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
}