import useGiteeApi from "@/api/useGiteeApi";
import { Repo } from "@/types/gitee";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetRepos() {
  const api = useGiteeApi();

  return useInfiniteQuery({
    queryKey: ["repos"],
    queryFn: async (e) => {
      // visibility=all&sort=full_name&page=2&per_page=5
      const searchParams = new URLSearchParams({
        visibility: "all",
        sort: "full_name",
        page: e.pageParam.page.toString(),
        per_page: e.pageParam.per_page.toString(),
      });

      const response = await api.get(`/api/v5/user/repos?${searchParams}`);
      const data = (await response.json()) as Repo[];
      return data;
    },
    initialPageParam: {
      page: 1,
      per_page: 5,
    },
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length < 5
        ? null
        : {
            page: lastPageParams.page + 1,
            per_page: 5,
          },
  });
}
