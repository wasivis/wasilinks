// src/app/[userId]/page.tsx
import { db } from "@/db";
import { links, users } from "@/db/schema";
import { eq, or } from "drizzle-orm"; // 👈 Make sure 'or' is imported!
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  // 1. Find the user by ID OR by Username
  const user = await db.query.users.findFirst({
    where: or(
      eq(users.id, userId),
      eq(users.username, userId)
    ),
  });

  // 2. If no user exists with that ID or Username, 404
  if (!user) {
    notFound();
  }

  // 3. CRITICAL FIX: Always fetch links using the user's permanent ID
  // This ensures links show up on both the /ID and /username pages
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, user.id)); // 👈 Use user.id, NOT userId from params

return (
  <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center pt-20 px-4 relative overflow-hidden">
    
    {/* Background Glow Effect */}
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

    <div className="flex flex-col items-center mb-8 relative z-10">
      <Avatar className="w-24 h-24 mb-4 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20">
        <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
        <AvatarFallback className="bg-zinc-800 text-xl">
          {user.name?.[0] ?? "U"}
        </AvatarFallback>
      </Avatar>
      
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
        @{user.username || user.name?.replace(/\s+/g, "").toLowerCase()}
      </h1>
      <p className="text-zinc-500 text-sm mt-2">My links</p>
    </div>

    <div className="w-full max-w-md space-y-4 relative z-10">
      {userLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full p-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl text-center font-medium transition-all hover:scale-[1.02] hover:bg-zinc-800/60 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
        >
          {link.title}
        </a>
      ))}

      {userLinks.length === 0 && (
        <p className="text-center text-zinc-600 italic mt-8">No links shared yet.</p>
      )}
    </div>

    {/* Subtle Footer Branding */}
    <footer className="mt-auto pb-12 pt-20 relative z-10">
      <p className="text-zinc-800 text-[10px] font-bold tracking-[0.2em] uppercase">
        Built with WasiLinks
      </p>
    </footer>
  </div>
);
}