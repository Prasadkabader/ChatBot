import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onSelect={onSelect} />
      ))}
    </div>
  );
}
