import { listenLoginEvent } from "@/events";
import useGetUserInfo from "@/hooks/mutations/useGetUserInfo";
import { setTokenInfo, setUserInfo } from "@/store/user";
import RepoViewWindow from "@/windows/RepoViewWindow";
import { useEffect } from "react";
import { EventCallback } from "@tauri-apps/api/event";
import { TokenInfo } from "@/types/user";

export default function useListenLoginSuccess() {
  const getUserInfo = useGetUserInfo();

  const loadUserInfo = async () => {
    getUserInfo.mutateAsync().then((data) => {
      console.log(data);
      setUserInfo(data);
    });
  };

  const callback: EventCallback<TokenInfo> = async (event) => {
    setTokenInfo(event.payload);
    const window = await RepoViewWindow.getWindow();
    if (window) {
      await window.show();
    }
    loadUserInfo();
  };

  useEffect(() => {
    const listenFn = listenLoginEvent("login::success", callback);
    return () => {
      listenFn.then((unListen) => unListen());
    };
  }, []);
}
