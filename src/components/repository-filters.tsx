import { Calendar } from "lucide-react";

import type { Repository } from "@/types";
import { LanguageSelect } from "@/components/language-select";
import { RepositoryHeader } from "@/components/repository-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewModeToggle } from "@/components/view-mode-toggle";

interface RepositoryFiltersProps {
  repository?: Repository;
  dateJump: string;
  viewMode: "grid" | "list";
  onDateJumpChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function RepositoryFilters({
  repository,
  dateJump,
  viewMode,
  onDateJumpChange,
  onViewModeChange,
}: RepositoryFiltersProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center">
        {repository && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <RepositoryHeader repository={repository} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <LanguageSelect />

        <Select value={dateJump} onValueChange={onDateJumpChange}>
          <SelectTrigger className="bg-background hover:bg-accent hover:text-accent-foreground w-full shadow-xs sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Daily</SelectItem>
            <SelectItem value="weeks">Weekly</SelectItem>
            <SelectItem value="months">Monthly</SelectItem>
            <SelectItem value="years">Yearly</SelectItem>
          </SelectContent>
        </Select>

        <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>
    </div>
  );
}
