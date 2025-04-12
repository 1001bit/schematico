import ProjectCard, { CardData } from "./ProjectCard";

export interface ProjectListData {
  projects: CardData[];
  className?: string;
}

export default function ProjectList(props: ProjectListData) {
  return !props.projects || props.projects.length === 0 ? (
    <p>no projects</p>
  ) : (
    <div className={`flex gap-6 flex-wrap ${props.className}`}>
      {props.projects.map((proj) => {
        return (
          <ProjectCard
            key={proj.id}
            id={proj.id}
            title={proj.title}
          ></ProjectCard>
        );
      })}
    </div>
  );
}
