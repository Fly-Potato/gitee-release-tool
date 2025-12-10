import { GITEE_HOST } from "@/config";
import { useUserInfoStore } from "@/store/user";
import { fetch, ClientOptions } from "@tauri-apps/plugin-http";

const markUrl = (url: URL | Request | string) => {
  if (url instanceof Request) {
    return url;
  }
  return new URL(url, GITEE_HOST);
};

export default function useGiteeApi() {
  const giteeFetch = async (
    url: URL | string | Request,
    initOption: RequestInit & ClientOptions,
  ) => {
    const accessToken = useUserInfoStore.getState().tokenInfo?.access_token;
    console.log(accessToken);
    const defaultHeaders = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, {
      ...initOption,
      headers: { ...defaultHeaders, ...initOption?.headers },
    });
    return response;
  };

  const api: {
    get: (
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<Response>;
    post: (
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<Response>;
    put: (
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<Response>;
    delete: (
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<Response>;
  } = {
    get: (url, initOption) => {
      return giteeFetch(markUrl(url), { ...initOption, method: "GET" });
    },
    post: (url, initOption) => {
      return giteeFetch(markUrl(url), { ...initOption, method: "POST" });
    },
    put: (url, initOption) => {
      return giteeFetch(markUrl(url), { ...initOption, method: "PUT" });
    },
    delete: (url, initOption) => {
      return giteeFetch(markUrl(url), { ...initOption, method: "DELETE" });
    },
  };
  return api;
}
