import { Button } from "@/components/ui/button";
import type { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-5xl text-red-500">RsdsdssRRRRRRRRRRRR</h1>
      <h1 className="text-5xl text-red-500">RsdsdssRRRRRRRRRRRR</h1>
      <h1 className="text-5xl text-red-500">RsdsdssRRRRRRRRRRRR</h1>
      <h1 className="text-5xl text-red-500">RsdsdssRRRRRRRRRRRR</h1>
      <h1 className="text-5xl text-red-500">RsdsdssRRRRRRRRRRRR</h1>
      <Button >efdfdf</Button>
    </>
  );
}
