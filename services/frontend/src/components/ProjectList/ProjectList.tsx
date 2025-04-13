import { ProjectInterface } from "../../project/interfaces";
import ProjectCard from "./ProjectCard";

export interface ProjectListData {
  projects: Record<string, ProjectInterface>;
  className?: string;
}

export default function ProjectList(props: ProjectListData) {
  return !props.projects || Object.keys(props.projects).length === 0 ? (
    <p>no projects</p>
  ) : (
    <div className={`flex gap-6 flex-wrap ${props.className}`}>
      {Object.entries(props.projects).map(([id, proj]) => {
        return <ProjectCard key={id} id={id} title={proj.title}></ProjectCard>;
      })}
    </div>
  );
}
