import { GITEE_HOST } from "@/config";
import { useUserInfoStore } from "@/store/user";
import { fetch } from "@tauri-apps/plugin-http";

export default function useGiteeApi() {
  const tokenInfo = useUserInfoStore((state) => state.tokenInfo);

  const defaultHeaders = {
    Authorization: `Bearer ${tokenInfo?.access_token}`,
  };

  const giteeFetch: typeof fetch = (url, initOption) => {
    return fetch(url, { ...initOption, headers: { ...defaultHeaders } });
  };

  const getURL = () => {};
  const api: { get: typeof fetch } = {
    get: (url, initOption) => {
      return giteeFetch(url, initOption);
    },
  };
  return api;
}
