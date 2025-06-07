import type { Repository } from "@/types";
import { RepositoryHeader } from "@/components/repository-header";
import { RepositoryCard } from "@/components/repository-item";

import { DynamicBorder } from "./ui/dynamic-border";

interface RepositoryListProps {
  repositories: Array<Repository>;
  viewMode: "grid" | "list";
}

export function RepositoryList({ repositories, viewMode }: RepositoryListProps) {
  return (
    <>
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
              <DynamicBorder key={repo.id}>
                <RepositoryCard repository={repo} viewMode={viewMode} />
              </DynamicBorder>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
