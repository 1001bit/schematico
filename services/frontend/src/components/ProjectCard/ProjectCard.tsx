import { Link } from "react-router";

export interface CardData {
  id: string;
  title: string;
}

export default function ProjectCard(props: CardData) {
  return (
    <div className="flex flex-col text-center px-4 py-1 border">
      <h3>{props.title}</h3>
      <Link to={`/project/${props.id}`}>
        <p>see</p>
      </Link>
    </div>
  );
}
