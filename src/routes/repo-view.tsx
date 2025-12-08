import RepoViewPage from "@/pages/repo-view/RepoViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/repo-view")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RepoViewPage />;
}
