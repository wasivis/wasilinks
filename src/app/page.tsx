// src/app/page.tsx
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link2, Github, Globe, Sparkles } from "lucide-react";

export default async function Home() {
  const session = await auth();

  // If already logged in, skip the landing page
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="z-10 text-center px-4 max-w-2xl">
 
        {/* Hero Text */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          WasiLinks
        </h1>
        
        <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Minimalist &quot;link-in-bio&quot; site. Share your projects, 
          socials, and portfolio in one clean space.
        </p>

        {/* Sign In Button */}
        <form
          className="flex justify-center"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button size="lg" className="cursor-pointer bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
            <Globe className="w-5 h-5" />
            Get Started with Google
          </Button>
        </form>

        {/* Social Proof / Features */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Custom @usernames</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span className="text-sm">Open Source</span>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 text-zinc-600 text-xs font-mono tracking-widest uppercase">
        Built by wasivis - {new Date().getFullYear()} WasiLinks
      </div>
    </div>
  );
}