import { useState, useEffect } from "react";
import { getProject, getPrompts, createPrompt } from "../services/api";
import ChatWindow from "../components/ChatWindow";

export default function Project({ projectId }) {
  const [project, setProject] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await getProject(projectId);
      setProject(res.data);
    };

    const fetchPrompts = async () => {
      const res = await getPrompts(projectId);
      setPrompts(res.data);
    };

    fetchProject();
    fetchPrompts();
  }, [projectId]);

  const handleCreatePrompt = async () => {
    if (!promptTitle || !promptTemplate) return;

    const res = await createPrompt(projectId, {
      title: promptTitle,
      role: "system", // default role, can be extended
      template: promptTemplate,
      variables: {},
    });

    setPrompts([...prompts, res.data]);
    setPromptTitle("");
    setPromptTemplate("");
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar: Prompts */}
      <div className="w-1/4 border-r p-4 overflow-y-auto bg-gray-50">
        <h2 className="font-bold text-lg mb-4">{project.name} Prompts</h2>

        {/* List existing prompts */}
        <div className="mb-4">
          {prompts.map((p) => (
            <div
              key={p.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                selectedPrompt?.id === p.id ? "bg-blue-200" : "bg-white"
              } hover:bg-blue-100`}
              onClick={() => setSelectedPrompt(p)}
            >
              {p.title}
            </div>
          ))}
        </div>

        {/* Add new prompt */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Add New Prompt</h3>
          <input
            type="text"
            placeholder="Title"
            className="border rounded px-2 py-1 mb-2 w-full"
            value={promptTitle}
            onChange={(e) => setPromptTitle(e.target.value)}
          />
          <textarea
            placeholder="Template"
            className="border rounded px-2 py-1 mb-2 w-full"
            value={promptTemplate}
            onChange={(e) => setPromptTemplate(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            onClick={handleCreatePrompt}
          >
            Add Prompt
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4">
        {selectedPrompt ? (
          <div className="h-full flex flex-col">
            <h3 className="font-bold text-lg mb-2">{selectedPrompt.title}</h3>
            <ChatWindow projectId={project.id} promptId={selectedPrompt.id} />
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Select a prompt to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
