import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { infiniteQueryOptions, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { startOfDay, sub } from "date-fns";
import { AlertCircle, Calendar, Github, Grid3X3, List, Rewind } from "lucide-react";

import type { Repository, RepositoryFilters } from "@/types";
import type { QueryClient } from "@tanstack/react-query";
import { fetchTrending } from "@/api/repository";
import { LanguageSelect } from "@/components/language-select";
import { LoadingSpinner } from "@/components/loading-spinner";
import { RepositoryHeader } from "@/components/repository-header";
import { RepositoryCard } from "@/components/repository-item";
import { ThemeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  component: GitHuntApp,
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

export default function GitHuntApp() {
  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const repositories = data?.pages || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
              <Github className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">GitHunt</h1>
              <p className="text-gray-600 dark:text-gray-400">Most starred projects on GitHub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Github className="mr-2 h-4 w-4" />
              View Source
            </Button>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="mx-auto max-w-7xl">
        <Alert className="mx-6 mt-4 w-auto justify-self-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div>
              Make sure to{" "}
              <a href="#" className="text-blue-600 underline">
                add a token
              </a>{" "}
              to avoid hitting the rate limit
            </div>
          </AlertDescription>
        </Alert>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 flex items-center justify-start md:justify-between">
          <div className="flex items-center gap-4">
            {repositories[0] && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <RepositoryHeader repository={repositories[0]} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelect />

            <Select value={dateJump} onValueChange={updateDateJump}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Daily</SelectItem>
                <SelectItem value="weeks">Weekly</SelectItem>
                <SelectItem value="months">Monthly</SelectItem>
                <SelectItem value="years">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </div>

        {repositories.map((repository, index) => (
          <div key={repository.start + repository.end}>
            {index > 0 && (
              <div className="flex justify-center py-8">
                <RepositoryHeader repository={repository} />
              </div>
            )}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {repository.data.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-center text-center" ref={ref}>
          {isFetching ? (
            <LoadingSpinner size={80} />
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              <Rewind />
              Load previous {dateJump}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
