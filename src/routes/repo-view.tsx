import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/repo-view")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/repo-view"!</div>;
}
