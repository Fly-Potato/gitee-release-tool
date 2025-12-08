import { useUserInfoStore } from "@/store/user";
import { useEffect } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import RepoViewWindow from "@/windows/RepoViewWindow";

export default function RepoViewPage() {
  const authenticated = useUserInfoStore((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      getCurrentWebviewWindow()
        .hide()
        .then(() => {
          RepoViewWindow.openWindow();
        });
    }
  }, []);

  return <></>;
}
