"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react"; // Closest icon or use a Google SVG

export default function LoginButton() {
  return (
    <Button 
      onClick={() => signIn("google", { redirectTo: "/dashboard" })}
      variant="outline"
      className="flex gap-2 border-zinc-800 bg-white text-black hover:bg-zinc-100"
    >
      <Chrome size={18} />
      Sign in with Google
    </Button>
  );
}