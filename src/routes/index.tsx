import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  ExternalLink,
  GitFork,
  Github,
  Grid3X3,
  List,
  Star,
  Twitter,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  component: GitHuntApp,
});

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const mockRepositories: Array<Repository> = [
  {
    id: 1,
    name: "jav-play",
    full_name: "aizhimou/jav-play",
    description: "Play video directly in JAVDB",
    html_url: "https://github.com/aizhimou/jav-play",
    stargazers_count: 388,
    forks_count: 32,
    open_issues_count: 2,
    language: "TypeScript",
    created_at: "2025-05-27T00:00:00Z",
    updated_at: "2025-05-27T00:00:00Z",
    owner: {
      login: "aizhimou",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/aizhimou",
    },
  },
  {
    id: 2,
    name: "vocabulary-corpus",
    full_name: "hubingkang/vocabulary-corpus",
    description: "44000+ 词汇语料库",
    html_url: "https://github.com/hubingkang/vocabulary-corpus",
    stargazers_count: 267,
    forks_count: 73,
    open_issues_count: 0,
    language: "TypeScript",
    created_at: "2025-05-28T00:00:00Z",
    updated_at: "2025-05-28T00:00:00Z",
    owner: {
      login: "hubingkang",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/hubingkang",
    },
  },
  {
    id: 3,
    name: "SelfyAI",
    full_name: "aubler/SelfyAI",
    description: "Tokenize The Virtual Agents Onchain",
    html_url: "https://github.com/aubler/SelfyAI",
    stargazers_count: 138,
    forks_count: 23,
    open_issues_count: 0,
    language: "TypeScript",
    created_at: "2025-05-27T00:00:00Z",
    updated_at: "2025-05-27T00:00:00Z",
    owner: {
      login: "aubler",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/aubler",
    },
  },
  {
    id: 4,
    name: "ccusage",
    full_name: "ryoppippi/ccusage",
    description: "A CLI tool for analyzing Claude Code usage from local JSONL files.",
    html_url: "https://github.com/ryoppippi/ccusage",
    stargazers_count: 130,
    forks_count: 5,
    open_issues_count: 1,
    language: "TypeScript",
    created_at: "2025-05-29T00:00:00Z",
    updated_at: "2025-05-29T00:00:00Z",
    owner: {
      login: "ryoppippi",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/ryoppippi",
    },
  },
  {
    id: 5,
    name: "SnitchBench",
    full_name: "t3dotgg/SnitchBench",
    description: "No description given.",
    html_url: "https://github.com/t3dotgg/SnitchBench",
    stargazers_count: 128,
    forks_count: 10,
    open_issues_count: 2,
    language: "TypeScript",
    created_at: "2025-05-30T00:00:00Z",
    updated_at: "2025-05-30T00:00:00Z",
    owner: {
      login: "t3dotgg",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/t3dotgg",
    },
  },
  {
    id: 6,
    name: "expo-auto-resizing-input",
    full_name: "rs-4/expo-auto-resizing-input",
    description: "No description given.",
    html_url: "https://github.com/rs-4/expo-auto-resizing-input",
    stargazers_count: 113,
    forks_count: 12,
    open_issues_count: 0,
    language: "TypeScript",
    created_at: "2025-05-29T00:00:00Z",
    updated_at: "2025-05-29T00:00:00Z",
    owner: {
      login: "rs-4",
      avatar_url: "/placeholder.svg?height=40&width=40",
      html_url: "https://github.com/rs-4",
    },
  },
];

export default function GitHuntApp() {
  const [repositories, setRepositories] = useState<Array<Repository>>(mockRepositories);
  const [language, setLanguage] = useState("TypeScript");
  const [timeframe, setTimeframe] = useState("Weekly");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);
    return `${Math.ceil((now.getTime() - weekAgo.getTime()) / (1000 * 60 * 60 * 24))} days ago`;
  };

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
            <Button className="bg-blue-500 hover:bg-blue-600" size="sm">
              <Twitter className="mr-2 h-4 w-4" />
              Tweet
            </Button>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="mx-auto max-w-7xl">
        <Alert className="mx-6 mt-4 w-auto justify-self-center border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {getTimeAgo()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">May 26, 2025 – June 2, 2025</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Go">Go</SelectItem>
                <SelectItem value="Rust">Rust</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
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

        {/* Repository Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {repositories.map((repo) => (
            <Card key={repo.id} className="gap-2 transition-shadow hover:shadow-lg">
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
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {repo.owner.login}
                      </p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
