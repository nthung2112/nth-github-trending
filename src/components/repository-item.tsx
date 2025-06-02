import { AlertCircle, GitFork, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RepositoryItem } from "@/types";

interface RepositoryCardProps {
  repository: RepositoryItem;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function RepositoryCard({ repository: repo }: RepositoryCardProps) {
  return (
    <Card className="gap-2 transition-shadow hover:shadow-lg" key={repo.id}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={repo.owner.avatar_url || "/placeholder.svg"}
                alt={repo.owner.login}
              />
              <AvatarFallback>{repo.owner.login[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{repo.owner.login}</p>
              <a
                href={repo.owner.html_url}
                className="text-sm text-gray-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <CardTitle className="text-lg">
            <a
              href={repo.html_url}
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
          </CardTitle>
          <p className="mt-1 text-sm text-gray-600">
            Built by · {repo.owner.login} · {formatDate(repo.created_at)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-4 min-h-[2.5rem]">
          {repo.description || "No description given."}
        </CardDescription>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>{repo.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>{repo.open_issues_count}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
