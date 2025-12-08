import { useUserInfoStore } from "@/store/user";
import { useEffect, useRef } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import LoginWindow from "@/windows/LoginWindow";

export default function RepoViewPage() {
  const authenticated = useUserInfoStore((state) => state.authenticated);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;

    if (!authenticated) {
      getCurrentWebviewWindow()
        .hide()
        .then(() => {
          LoginWindow.openWindow();
        });
    }
    return () => {
      LoginWindow.closeWindow();
    };
  }, []);

  return <></>;
}
