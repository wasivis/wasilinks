"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { links, users } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"

export async function addLink(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const url = formData.get("url") as string

  // Insert the new link into Drizzle
  await db.insert(links).values({
    userId: session.user.id,
    title,
    url,
  })

  // This tells Next.js to refresh the dashboard data immediately
  revalidatePath("/dashboard")
}

export async function deleteLink(linkId: number) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.delete(links).where(
    and(
      eq(links.id, linkId),
      eq(links.userId, session.user.id) // 👈 Important: Only delete if it belongs to YOU
    )
  )

  revalidatePath("/dashboard")
}

export async function updateUsername(username: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // 1. Clean the username (lowercase, no spaces)
  const cleanUsername = username.toLowerCase().trim().replace(/\s+/g, "")

  // 2. Check if someone else already has it
  const existing = await db.query.users.findFirst({
    where: eq(users.username, cleanUsername),
  })

  if (existing) return { error: "Username already taken" }

  // 3. Update the user
  await db.update(users)
    .set({ username: cleanUsername })
    .where(eq(users.id, session.user.id))

  revalidatePath("/dashboard")
  return { success: true }
}