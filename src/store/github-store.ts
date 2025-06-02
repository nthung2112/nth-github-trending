import { formatISO } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Repository } from "@/types";

// Define types for repository and state
type GithubState = {
  processing: boolean;
  repositories: Array<Repository>;
  error: string | null;

  // Actions
  fetchTrending: (filters: {
    dateRange: { start: string | Date; end: string | Date };
    language?: string;
    token?: string;
  }) => Promise<void>;
  updateLanguage: () => void;
  updateDateType: () => void;
};

const API_URL = "https://api.github.com/search/repositories";

const transformFilters = (filters: {
  dateRange: { start: string | Date; end: string | Date };
  language?: string;
}) => {
  const transformedFilters: { q: string; sort: string; order: string } = {
    q: "",
    sort: "stars",
    order: "desc",
  };

  const startDate = new Date(filters.dateRange.start);
  const endDate = new Date(filters.dateRange.end);

  // Format dates in ISO format (YYYY-MM-DDTHH:mm:ss.SSSZ)
  const formattedStart = formatISO(startDate);
  const formattedEnd = formatISO(endDate);

  const reposDate = `created:${formattedStart}..${formattedEnd}`;
  const reposLanguage = filters.language ? `language:${filters.language} ` : "";

  transformedFilters.q = reposLanguage + reposDate;

  return transformedFilters;
};

const useGithubStore = create<GithubState>()(
  persist(
    (set, _get) => ({
      // Initial state
      processing: false,
      repositories: [],
      error: null,

      // Actions
      fetchTrending: async (filters) => {
        // Set processing state
        set({ processing: true, error: null });

        try {
          const params = new URLSearchParams(transformFilters(filters)).toString();
          const response = await fetch(`${API_URL}?${params}`, {
            headers: {
              ...(filters.token ? { Authorization: `token ${filters.token}` } : {}),
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw { response: { data: errorData, status: response.status } };
          }
          const data = await response.json();

          // Success case
          set((state) => ({
            processing: false,
            repositories: [
              ...state.repositories,
              {
                start: formatISO(new Date(filters.dateRange.start)),
                end: formatISO(new Date(filters.dateRange.end)),
                data,
              },
            ],
            error: null,
          }));
        } catch (error: any) {
          // Error handling
          let message = error.response?.data?.message;
          if (!message) {
            message = error.message;
          }

          set({
            processing: false,
            error: message,
          });
        }
      },

      // Reset state when language or date type is updated
      updateLanguage: () => {
        set({
          processing: false,
          repositories: [],
          error: null,
        });
      },

      updateDateType: () => {
        set({
          processing: false,
          repositories: [],
          error: null,
        });
      },
    }),
    {
      name: "github-storage",
    }
  )
);

export default useGithubStore;
