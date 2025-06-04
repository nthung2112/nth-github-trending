import { formatISO } from "date-fns";

import type { Repository } from "@/types";

const API_URL = "https://api.github.com/search/repositories";

const transformFilters = (filters: {
  startDate: string | Date;
  endDate: string | Date;
  language?: string;
}) => {
  const transformedFilters: { q: string; sort: string; order: string } = {
    q: "",
    sort: "stars",
    order: "desc",
  };

  const startDate = new Date(filters.startDate);
  const endDate = new Date(filters.endDate);

  // Format dates in ISO format (YYYY-MM-DDTHH:mm:ss.SSSZ)
  const formattedStart = formatISO(startDate);
  const formattedEnd = formatISO(endDate);

  const reposDate = `created:${formattedStart}..${formattedEnd}`;
  const reposLanguage = filters.language ? `language:${filters.language} ` : "";

  transformedFilters.q = reposLanguage + reposDate;

  return transformedFilters;
};

export const fetchTrending = async (filters: {
  startDate: string | Date;
  endDate: string | Date;
  language?: string;
  token?: string;
}): Promise<Repository> => {
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

    return {
      start: formatISO(new Date(filters.startDate)),
      end: formatISO(new Date(filters.endDate)),
      data: data.items,
    };
  } catch (error: any) {
    // Error handling
    let message = error.response?.data?.message;
    if (!message) {
      message = error.message;
    }

    console.error("Error fetching trending repositories:", message);
    throw new Error(message);
  }
};
