import { Github } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-gray-900 sm:flex">
            <Github className="size-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              NTH GitHub Trending
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Most starred projects on GitHub</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            <Github className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline-block">View Source</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
