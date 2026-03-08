export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">User not found</h2>
      <p className="text-zinc-500">This WasiLink doesn't exist yet.</p>
      <a href="/" className="mt-4 text-indigo-400 underline">Go Home</a>
    </div>
  );
}