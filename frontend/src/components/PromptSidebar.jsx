import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromptSidebar({ project, prompts, selectedPrompt, onSelectPrompt, onCreatePrompt }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("");
  const [role, setRole] = useState("system");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !template.trim()) return;

    setLoading(true);
    try {
      const newPrompt = await onCreatePrompt({
        title: title.trim(),
        role,
        template: template.trim(),
        variables: {}
      });
      
      setTitle("");
      setTemplate("");
      setRole("system");
      setShowCreateForm(false);
      onSelectPrompt(newPrompt);
    } catch (error) {
      alert("Failed to create prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm p-6 overflow-y-auto">
      {/* Project Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
        <p className="text-white/60 text-sm">{project.description || "No description"}</p>
        <div className="mt-2">
          <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs">
            {project.model}
          </span>
        </div>
      </div>

      {/* Prompts Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Prompts</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-500/20 hover:bg-green-500/30 text-green-200 px-3 py-1 rounded-lg text-sm transition-all duration-200"
          >
            + Add
          </motion.button>
        </div>

        {/* Prompt List */}
        <div className="space-y-2 mb-4">
          {prompts.map((prompt) => (
            <motion.div
              key={prompt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPrompt(prompt)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPrompt?.id === prompt.id
                  ? "bg-blue-500/30 border border-blue-400/50"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              <h4 className="text-white font-medium text-sm">{prompt.title}</h4>
              <p className="text-white/60 text-xs mt-1">
                Role: {prompt.role} • v{prompt.version}
              </p>
            </motion.div>
          ))}
          
          {prompts.length === 0 && (
            <div className="text-center py-8 text-white/60">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-sm">No prompts yet</p>
              <p className="text-xs mt-1">Create your first prompt to get started</p>
            </div>
          )}
        </div>

        {/* Create Prompt Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 rounded-lg p-4 border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="Enter prompt title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="system" className="bg-gray-800">System</option>
                    <option value="user" className="bg-gray-800">User</option>
                    <option value="assistant" className="bg-gray-800">Assistant</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Template
                  </label>
                  <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                    placeholder="Enter your prompt template..."
                    rows="4"
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!title.trim() || !template.trim() || loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded text-sm font-medium transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}