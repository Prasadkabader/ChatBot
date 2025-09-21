import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getProjects, createProject } from "../services/api";
import ProjectList from "../components/ProjectList";
import CreateProjectModal from "../components/CreateProjectModal";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects(1); // Replace with actual user ID from auth
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    navigate(`/project/${project.id}`);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const res = await createProject(projectData, 1); // Replace with actual user ID
      setProjects([...projects, res.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
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

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI Dashboard
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Manage your chatbot projects, create new experiences, and monitor your AI conversations.
          </p>
        </motion.div>

        <ProjectList
          projects={projects}
          onSelect={handleSelectProject}
          onCreateNew={() => setShowCreateModal(true)}
        />

        {showCreateModal && (
          <CreateProjectModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateProject}
          />
        )}
      </div>
    </div>
  );
}