import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { infiniteQueryOptions, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { startOfDay, sub } from "date-fns";

import type { Repository, RepositoryFilters } from "@/types";
import type { QueryClient } from "@tanstack/react-query";
import { fetchTrending } from "@/api/repository";
import { AddTokenModal } from "@/components/add-token-modal";
import { AppHeader } from "@/components/app-header";
import { LoadMoreButton } from "@/components/load-more-button";
import { RepositoryFilters as RepoFilters } from "@/components/repository-filters";
import { RepositoryList } from "@/components/repository-list";
import { TokenAlert } from "@/components/token-alert";
import { useFilters } from "@/hooks/useFilters";

const getRepositoriesQueryOptions = (deps: RepositoryFilters) => {
  const dateJump = deps.dateJump || "weeks";
  const language = deps.language || "";
  const token = deps.token || "";

  return infiniteQueryOptions({
    queryKey: ["repositories", deps],
    queryFn: async ({ pageParam }): Promise<Repository> => {
      return await fetchTrending(pageParam);
    },
    initialPageParam: {
      language,
      startDate: startOfDay(sub(new Date(), { [dateJump]: 1 })),
      endDate: startOfDay(new Date()),
      token,
    },
    getNextPageParam: (lastPage) => ({
      startDate: startOfDay(sub(new Date(lastPage.start), { [dateJump]: 1 })),
      endDate: new Date(lastPage.start),
      language,
      token,
    }),
  });
};

export const Route = createFileRoute("/")({
  component: IndexPage,
  validateSearch: (search) => search as RepositoryFilters,
  loaderDeps: ({ search: { language, token, dateJump } }) => ({
    language,
    token,
    dateJump,
  }),
  loader: ({ context, deps }) => {
    const { queryClient } = context as { queryClient: QueryClient };
    return queryClient.ensureInfiniteQueryData(getRepositoriesQueryOptions(deps));
  },
});

export default function IndexPage() {
  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showTokenModal, setShowTokenModal] = useState(false);
  const { filters, setFilters } = useFilters(Route.fullPath);
  const dateJump = filters.dateJump || "weeks";

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(getRepositoriesQueryOptions(filters));

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const updateDateJump = (value: string) => {
    setFilters({ dateJump: value });
  };

  const handleTokenSave = (token: string) => {
    setFilters({ token });
    setShowTokenModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const repositories = data?.pages || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppHeader />
      <TokenAlert onAddToken={() => setShowTokenModal(true)} />

      <div className="mx-auto max-w-7xl px-6 py-6">
        <RepoFilters
          repository={repositories[0]}
          dateJump={dateJump}
          viewMode={viewMode}
          onDateJumpChange={updateDateJump}
          onViewModeChange={setViewMode}
        />

        <RepositoryList repositories={repositories} viewMode={viewMode} />

        <LoadMoreButton
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          dateJump={dateJump}
          onLoadMore={() => fetchNextPage()}
          refCallback={ref}
        />

        <AddTokenModal
          open={showTokenModal}
          onOpenChange={setShowTokenModal}
          onTokenSave={handleTokenSave}
        />
      </div>
    </div>
  );
}
