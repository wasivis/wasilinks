"use client";

import { deleteLink } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteLinkButton({ linkId }: { linkId: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
      onClick={async () => {
        if (confirm("You sure you want to delete this?")) {
          await deleteLink(linkId);
        }
      }}
    >
      <Trash2 size={16} />
    </Button>
  );
}