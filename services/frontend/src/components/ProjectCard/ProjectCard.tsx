import { Link } from "react-router";

export interface CardData {
  id: string;
  title: string;
}

export default function ProjectCard(props: CardData) {
  return (
    <div className="flex flex-col text-center w-50 border p-2 rounded-lg">
      <h3>{props.title}</h3>
      <Link to={`/project/${props.id}`}>
        <p>see</p>
      </Link>
    </div>
  );
}
