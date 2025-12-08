import useGetRepos from "@/hooks/mutations/useGetRepos";
import useGetUserInfo from "@/hooks/mutations/useGetUserInfo";
import { useReposStore } from "@/store/repo";
import { useUserInfoStore } from "@/store/user";
import { listen } from "@/utils/event";
import { useEffect } from "react";

export default function useListenLogin() {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const setRepos = useReposStore((state) => state.reset);
  const getUserInfo = useGetUserInfo();
  const getRepos = useGetRepos();

  useEffect(() => {
    const listenFn = listen("user::login", () => {
      getUserInfo.mutateAsync().then((userInfo) => {
        setUserInfo(userInfo);
      });
      getRepos.mutateAsync().then((repos) => {
        setRepos(repos);
      });
    });
    return () => {
      listenFn.then((unListen) => unListen());
    };
  }, []);
}
