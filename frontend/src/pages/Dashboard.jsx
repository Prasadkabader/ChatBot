import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectList from "../components/ProjectList";
import ChatWindow from "../components/ChatWindow";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects(1); // Replace 1 with dynamic userId
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r overflow-y-auto">
        <ProjectList projects={projects} onSelect={setSelectedProject} />
      </div>
      <div className="flex-1 p-4">
        {selectedProject ? (
          <ChatWindow projectId={selectedProject.id} />
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Select a project to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
