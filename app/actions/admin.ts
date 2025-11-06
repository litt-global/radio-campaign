"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export type AdminSubmission = {
  id: number
  packageName: string
  packagePrice: string
  artistName: string
  instagram: string
  email: string
  phone: string
  status: "new" | "programmed"
  notes: string | null
  createdAt: string
  files: {
    song?: { url: string; name: string; size: number }
    cover?: { url: string; name: string; size: number }
    intro?: { url: string; name: string; size: number }
    pronunciation?: { url: string; name: string; size: number }
  }
}

export async function getSubmissionsByPackage(packageName: string, status: "new" | "programmed") {
  try {
    console.log("[v0] Fetching submissions for package:", packageName, "status:", status)

    // Fetch campaigns with their files
    const campaigns = await sql`
      SELECT 
        c.id,
        c.package_name,
        c.package_price,
        c.artist_name,
        c.instagram_handle,
        c.email,
        c.phone,
        c.status,
        c.notes,
        c.created_at
      FROM campaigns_purchased c
      WHERE UPPER(c.package_name) = UPPER(${packageName})
      AND c.status = ${status}
      ORDER BY c.created_at DESC
    `

    console.log("[v0] Found campaigns:", campaigns.length)

    // Fetch files for each campaign
    const submissions: AdminSubmission[] = await Promise.all(
      campaigns.map(async (campaign) => {
        const files = await sql`
          SELECT file_type, file_url, file_name, file_size
          FROM uploaded_files
          WHERE campaign_id = ${campaign.id}
        `

        console.log("[v0] Files for campaign", campaign.id, ":", files.length)

        const filesMap: AdminSubmission["files"] = {}
        files.forEach((file) => {
          filesMap[file.file_type as keyof AdminSubmission["files"]] = {
            url: file.file_url,
            name: file.file_name,
            size: file.file_size,
          }
        })

        return {
          id: campaign.id,
          packageName: campaign.package_name,
          packagePrice: campaign.package_price,
          artistName: campaign.artist_name,
          instagram: campaign.instagram_handle,
          email: campaign.email,
          phone: campaign.phone,
          status: campaign.status as "new" | "programmed",
          notes: campaign.notes,
          createdAt: campaign.created_at,
          files: filesMap,
        }
      }),
    )

    console.log("[v0] Returning submissions:", submissions.length)
    return { success: true, submissions }
  } catch (error) {
    console.error("[v0] Error fetching submissions:", error)
    return { success: false, submissions: [], error: "Failed to fetch submissions" }
  }
}

export async function updateSubmissionStatus(id: number, status: "programmed", notes: string) {
  try {
    console.log("[v0] Updating submission", id, "to status:", status)

    await sql`
      UPDATE campaigns_purchased
      SET status = ${status}, notes = ${notes}
      WHERE id = ${id}
    `

    console.log("[v0] Successfully updated submission status")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating submission status:", error)
    return { success: false, error: "Failed to update submission status" }
  }
}
