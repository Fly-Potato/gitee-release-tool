import { Repo } from "@/types/gitee";
import { create } from "zustand";

type State = {
  repos: Repo[];
};

export const useReposStore = create<State>(() => ({
  repos: [],
}));

export const setRepos = (repos: Repo[]) => useReposStore.setState({ repos });
