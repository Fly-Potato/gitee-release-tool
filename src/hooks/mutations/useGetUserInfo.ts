import useGiteeApi from "@/api/useGiteeApi";
import { UserInfo } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export default function useGetUserInfo() {
  const api = useGiteeApi();
  return useMutation<UserInfo>({
    mutationFn: async () => await (await api.get("/api/v5/user")).json(),
  });
}
