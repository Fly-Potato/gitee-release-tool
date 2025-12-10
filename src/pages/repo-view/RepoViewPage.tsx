import { useUserInfoStore } from "@/store/user";
import { useEffect, useRef } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import LoginWindow from "@/windows/LoginWindow";
import useListenLoginSuccess from "./listeners/useListenLoginSuccess";
import RepoList from "./repo-list/RepoList";

export default function RepoViewPage() {
  const authenticated = useUserInfoStore((state) => state.authenticated);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const isLoaded = useRef(false);
  useListenLoginSuccess();

  useEffect(() => {
    console.log("authenticated", authenticated);
  }, [authenticated]);

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
      // LoginWindow.openWindow();
    }
    return () => {
      LoginWindow.closeWindow();
    };
  }, []);

  return (
    <div>
      <div>{userInfo?.name}</div>
      <div>{authenticated && <RepoList />}</div>
    </div>
  );
}
