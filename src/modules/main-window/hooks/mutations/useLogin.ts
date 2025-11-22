import { GITEE_CLIENT_ID, GITEE_CLIENT_SECRET, GITEE_HOST } from "@/config";
import { useMutation } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";

export default function useLogin() {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await fetch(`${GITEE_HOST}/oauth/token`, {
        method: "POST",
        body: new URLSearchParams({
          ...data,
          grant_type: "password",
          client_id: GITEE_CLIENT_ID,
          client_secret: GITEE_CLIENT_SECRET,
          scope: "projects user_info issues notes",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        console.error(result);
        throw new Error(result);
      }
    },
  });
}
