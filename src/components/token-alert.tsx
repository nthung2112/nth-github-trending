import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

interface TokenAlertProps {
  onAddToken: () => void;
}

export function TokenAlert({ onAddToken }: TokenAlertProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <Alert className="mx-6 mt-4 w-auto justify-self-center">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div>
            Make sure to{" "}
            <button onClick={onAddToken} className="text-blue-600 underline hover:text-blue-800">
              add a token
            </button>{" "}
            to avoid hitting the rate limit
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
