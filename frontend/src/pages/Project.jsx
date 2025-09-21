import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, getPrompts, createPrompt } from "../services/api";
import ChatWindow from "../components/ChatWindow";
import PromptSidebar from "../components/PromptSidebar";

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectRes, promptsRes] = await Promise.all([
        getProject(projectId),
        getPrompts(projectId)
      ]);
      
      setProject(projectRes.data);
      setPrompts(promptsRes.data);
    } catch (error) {
      console.error("Failed to fetch project data:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrompt = async (promptData) => {
    try {
      const res = await createPrompt(projectId, promptData);
      setPrompts([...prompts, res.data]);
      return res.data;
    } catch (error) {
      console.error("Failed to create prompt:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-400 hover:text-blue-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto h-[calc(100vh-5rem)] flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/20">
          <PromptSidebar
            project={project}
            prompts={prompts}
            selectedPrompt={selectedPrompt}
            onSelectPrompt={setSelectedPrompt}
            onCreatePrompt={handleCreatePrompt}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
            <ChatWindow
              projectId={project.id}
              promptId={selectedPrompt?.id}
              projectName={project.name}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}