import { listenLoginEvent } from "@/events";
import { useEffect } from "react";

export default function useListenLoginSuccess() {
  const callback = () => {};

  useEffect(() => {
    const listenFn = listenLoginEvent("login::success", callback);
    return () => {
      listenFn.then((unListen) => unListen());
    };
  }, []);
}
