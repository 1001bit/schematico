import { Link } from "react-router";

export interface CardData {
  id: string;
  title: string;
}

export default function ProjectCard(props: CardData) {
  return (
    <Link
      to={`/project/${props.id}`}
      className="
      flex flex-col
      text-center 
      px-8 py-4
      border-1
      border-acc-dim hover:border-acc
      hover:no-underline
      bg-acc-bg
      backdrop-blur-[0px] hover:backdrop-blur-[2px]
      transition-all duration-100 ease-in-out
    "
    >
      <h3>{props.title}</h3>
      {/* horizontal line */}
      <div className="border-b-1 border-acc-superdim my-2" />
      <p>see</p>
    </Link>
  );
}
