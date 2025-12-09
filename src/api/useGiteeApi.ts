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
  const giteeFetch = async <T = any, K = any>(
    url: URL | string | Request,
    initOption: RequestInit & ClientOptions,
  ) => {
    const accessToken = useUserInfoStore.getState().tokenInfo?.access_token;
    console.log(accessToken);
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, {
      ...initOption,
      headers: { ...defaultHeaders, ...initOption?.headers },
    });
    const data = await response.json();
    if (response.ok) {
      return data as T;
    }
    return Promise.reject(data as K);
  };

  const api: {
    get: <T = any>(
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<T>;
    post: <T = any>(
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<T>;
    put: <T = any>(
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<T>;
    delete: <T = any>(
      url: URL | string | Request,
      initOption?: RequestInit & ClientOptions,
    ) => Promise<T>;
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
