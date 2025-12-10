import useGetRepos from "@/hooks/mutations/useGetRepos";
import { useEffect } from "react";
export default function RepoList() {
  const { data, fetchNextPage, hasNextPage } = useGetRepos();

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [data?.pages]);

  return (
    <>
      {data?.pages.map((group, index) => {
        return (
          <div key={index}>
            {group.map((repo) => (
              <div key={repo.path}>{repo.name}</div>
            ))}
          </div>
        );
      })}
    </>
  );
}
