"use server"

import { createClient } from "@/lib/supabase/server"

export async function getSubmissionsByPackage(packageName: string, status = "new") {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("campaigns_purchased")
    .select(`
      *,
      payments (*),
      uploaded_files (*)
    `)
    .ilike("package_name", packageName)
    .eq("status", status)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching submissions:", error)
    throw new Error(error.message)
  }

  return data || []
}

export async function updateSubmissionStatus(campaignId: number, status: string, notes?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("campaigns_purchased").update({ status, notes }).eq("id", campaignId)

  if (error) {
    console.error("[v0] Error updating submission:", error)
    throw new Error(error.message)
  }

  return { success: true }
}
