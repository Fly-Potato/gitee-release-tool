import MainWindowPage from "@/modules/main-window/MainWindowPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/main-window")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainWindowPage />;
}
