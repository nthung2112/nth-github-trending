import { useState } from "react";
import { ExternalLink, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AddTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTokenSave?: (token: string) => void;
}

export function AddTokenModal({ open, onOpenChange, onTokenSave }: AddTokenModalProps) {
  const [token, setToken] = useState("");

  const handleSaveToken = () => {
    if (!token.trim()) {
      return;
    }
    onTokenSave?.(token.trim());
    setToken("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 sm:max-w-2xl">
        <DialogHeader className="space-y-4 text-left">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Add the Token
          </DialogTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Generate a token and add it below to avoid hitting the rate limit.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900 dark:bg-gray-100" />
              <div className="flex-1">
                <span className="text-gray-700 dark:text-gray-300">Go to the </span>
                <a
                  href="https://github.com/settings/tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
                >
                  Settings › Personal Access Tokens › New personal access token
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-gray-700 dark:text-gray-300"> of your github profile</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900 dark:bg-gray-100" />
              <div className="flex-1">
                <span className="text-gray-700 dark:text-gray-300">Click </span>
                <Badge className="bg-yellow-200 px-2 py-1 text-yellow-800 hover:bg-yellow-200">
                  Generate Token
                </Badge>
                <span className="text-gray-700 dark:text-gray-300"> .</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900 dark:bg-gray-100" />
              <div className="flex-1">
                <span className="text-gray-700 dark:text-gray-300">
                  You will be presented with the generated token. Copy the token and add it below
                </span>
              </div>
            </div>
          </div>

          {/* Token Input */}
          <div className="space-y-4">
            <Input
              placeholder="Paste your GitHub token here..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="border-2 border-gray-200 text-base focus:border-blue-500 dark:border-gray-700 dark:focus:border-blue-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button onClick={handleSaveToken} disabled={!token.trim()}>
              <Settings className="mr-2" />
              Save Token
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
