import { Rewind } from "lucide-react";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  dateJump: string;
  onLoadMore: () => void;
  refCallback: (node: Element | null) => void;
}

export function LoadMoreButton({
  isFetching,
  hasNextPage,
  isFetchingNextPage,
  dateJump,
  onLoadMore,
  refCallback,
}: LoadMoreButtonProps) {
  return (
    <div className="mt-6 flex justify-center text-center" ref={refCallback}>
      {isFetching ? (
        <LoadingSpinner size={80} />
      ) : (
        <Button
          variant="outline"
          size="lg"
          onClick={onLoadMore}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          <Rewind />
          Load previous {dateJump}
        </Button>
      )}
    </div>
  );
}
