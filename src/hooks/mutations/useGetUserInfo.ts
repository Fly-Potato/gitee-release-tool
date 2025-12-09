import useGiteeApi from "@/api/useGiteeApi";
import { UserInfo } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export default function useGetUserInfo() {
  const api = useGiteeApi();
  return useMutation({
    mutationFn: async () => await api.get<UserInfo>("/api/v5/user"),
  });
}
