import ProjectCard, {
  CardData as ProjectCardData,
} from "../ProjectCard/ProjectCard";

export interface ProjectListData {
  projects: ProjectCardData[];
}

export default function ProjectList(props: ProjectListData) {
  return props.projects.length === 0 ? (
    <p>no projects</p>
  ) : (
    <div className="flex gap-4 flex-wrap">
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
