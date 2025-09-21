export default function ProjectCard({ project, onSelect }) {
  return (
    <div
      className="p-4 m-2 bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onSelect(project)}
    >
      <h2 className="font-bold text-lg">{project.name}</h2>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}
