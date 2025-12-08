import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/repo-view/$repo-release")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/repo-view/$repo-release"!</div>;
}
