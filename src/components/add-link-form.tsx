import { addLink } from "@/app/dashboard/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddLinkForm() {
  return (
    <form action={addLink} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-zinc-400">Link Title</label>
        <Input 
          name="title" 
          placeholder="e.g. My Portfolio" 
          required 
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-400">URL</label>
        <Input 
          name="url" 
          type="url" 
          placeholder="https://..." 
          required 
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        Add Link
      </Button>
    </form>
  )
}