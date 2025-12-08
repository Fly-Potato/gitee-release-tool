import { GITEE_HOST } from "@/config";
import { useUserInfoStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";

export default function useGetUserInfo() {
  const tokenInfo = useUserInfoStore((state) => state.tokenInfo);

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${GITEE_HOST}/api/v5/user`, {
        headers: {
          Authorization: `${tokenInfo?.token_type} ${tokenInfo?.access_token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
      } else {
        console.error(await res.json());
        throw new Error("Failed to get user info");
      }
    },
  });
}
