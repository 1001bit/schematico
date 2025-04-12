import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import Button from "../components/Button/Button";
import AnimatedBackground from "../components/Background/Background";
import ProjectList from "../components/ProjectList/ProjectList";

export async function loader({ params }: any): Promise<void> {
  params;
  // TODO
}

export default function Home() {
  const data = useLoaderData();
  const title = useTitle();
  useEffect(() => {
    title.setTitle("home");
  }, []);

  const newProject = async () => {
    // TODO
  };

  return (
    <div
      className="
        flex flex-col
        gap-8 
        px-5
        py-15
        items-center
        md:px-15
        md:items-start
      "
    >
      <AnimatedBackground></AnimatedBackground>
      <h3>Projects:</h3>
      <ProjectList
        // TODO
        projects={[]}
        className="justify-center md:justify-start"
      />
      <Button onClick={newProject} className="w-40">
        new project
      </Button>
    </div>
  );
}
