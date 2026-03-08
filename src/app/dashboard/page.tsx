// src/app/dashboard/page.tsx
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { links, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddLinkForm from "@/components/add-link-form";
import DeleteLinkButton from "@/components/delete-link-button";
import { updateUsername } from "./actions";

export default async function DashboardPage() {
  const session = await auth();
  
  // 1. Protection: If not logged in, kick them to home
  if (!session?.user?.id) redirect("/");

  // 2. Fetch fresh user data (to check for the username)
  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  // 3. Fetch the user's links
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, session.user.id));

  // 4. Generate the profile URL (Username preferred, ID as fallback)
  const displayId = currentUser?.username || session.user.id;
  const profileUrl = `http://localhost:3000/${displayId}`;

return (
  <div className="min-h-screen bg-zinc-950 text-white p-8 relative overflow-hidden">
    {/* Background Glow Effect */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Welcome, {session.user?.name}!
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Live at: 
            <a 
              href={profileUrl} 
              target="_blank" 
              className="text-indigo-400 hover:text-indigo-300 transition-colors ml-2 font-mono"
            >
              /{displayId}
            </a>
          </p>
        </div>
        
        <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
          <Button variant="outline" className="cursor-pointer text-zinc-400 border-zinc-800 hover:bg-zinc-900">
            Logout
          </Button>
        </form>
      </div>

      {/* Username Claim Alert (Only shows if they haven't picked one) */}
      {!currentUser?.username && (
        <div className="mb-10 p-6 bg-indigo-500/5 border border-indigo-500/20 backdrop-blur-sm rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-indigo-300">Claim your custom URL</h3>
            <p className="text-sm text-indigo-200/60">Move from a random ID to a personalized @username.</p>
          </div>
          <form 
            action={async (formData) => {
              "use server";
              const username = formData.get("username") as string;
              await updateUsername(username);
            }} 
            className="flex w-full md:w-auto gap-2"
          >
            <Input 
              name="username" 
              placeholder="wasi" 
              required 
              className="bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 w-full md:w-40" 
            />
            <Button className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">Claim</Button>
          </form>
        </div>
      )}

      {/* Main Grid: Form and Links */}
      <div className="grid gap-8 md:grid-cols-5">
        
        {/* Left Side: Creation Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-900">
            <h2 className="text-lg font-semibold mb-6">Create New Link</h2>
            <AddLinkForm />
          </div>
        </div>

        {/* Right Side: Link Management */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Your Links 
            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">
              {userLinks.length}
            </span>
          </h2>
          
          <div className="space-y-3">
            {userLinks.length === 0 && (
              <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800 backdrop-blur-sm">
                <p className="text-zinc-600 italic">No links yet. Start by adding one!</p>
              </div>
            )}
            
            {userLinks.map((link) => (
              <div 
                key={link.id} 
                className="p-4 bg-zinc-900/60 hover:bg-zinc-900/90 backdrop-blur-sm transition-all rounded-xl border border-zinc-800 flex justify-between items-center group"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium truncate text-zinc-100">{link.title}</p>
                  <p className="text-xs text-zinc-500 truncate font-mono">{link.url}</p>
                </div>
                
                <div className="flex items-center">
                  <DeleteLinkButton linkId={link.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
)};