import LoginPage from "~/pages/auth/LoginPage";
import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inglish - Login" },
    { name: "description", content: "Login to your Inglish account" },
  ];
}

export default function login() {
  return <LoginPage />;
}
