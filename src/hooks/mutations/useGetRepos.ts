import { GITEE_HOST } from "@/config";
import { useTokenInfoStore } from "@/store/user";
import { Repo } from "@/types/gitee";
import { useMutation } from "@tanstack/react-query";

export default function useGetRepos() {
  const tokenInfo = useTokenInfoStore((state) => state.tokenInfo);

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${GITEE_HOST}/api/v5/user/repos`, {
        headers: {
          Authorization: `${tokenInfo?.token_type} ${tokenInfo?.access_token}`,
        },
      });
      if (res.ok) {
        const data: Repo[] = await res.json();
        console.log(data);
        return data;
      } else {
        throw new Error("Failed to get user info");
      }
    },
  });
}
