import { format, formatDistance } from "date-fns";

import type { Repository } from "@/types";

export function RepositoryHeader({ repository }: { repository: Repository }) {
  const { start, end } = repository;
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {formatDistance(new Date(start), new Date(end), {
          addSuffix: true,
        })}
      </span>
      <span className="text-gray-500 dark:text-gray-400">
        {format(new Date(start), "MM/dd/yyyy")} - {format(new Date(end), "MM/dd/yyyy")}
      </span>
    </div>
  );
}
