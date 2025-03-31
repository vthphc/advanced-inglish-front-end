import LandingPage from "~/pages/landing/LandingPage";
import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Advanced Inglish" },
    { name: "description", content: "Welcome to Advanced Inglish!" },
  ];
}

export default function Landing() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LandingPage />
    </div>
  );
}
