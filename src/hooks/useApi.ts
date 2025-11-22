import { fetch } from "@tauri-apps/plugin-http";

type FetchConfig = {
  headers: Record<string, unknown>;
  params: Record<string, unknown>;
};

export default function useApi() {
  const get = (url: string, config?: FetchConfig) => {
    if() {

    } else {

    }
  };

  return { get };
}
