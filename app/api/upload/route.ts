import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()

    const fileName = formData.get("fileName") as string
    const fileType = formData.get("fileType") as string
    const contentType = formData.get("contentType") as string

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "Missing file information" }, { status: 400 })
    }

    const sanitizedFileName = fileName
      .replace(/[^\w\s.-]/g, "") // Remove special characters except dots, dashes, and underscores
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/--+/g, "-") // Replace multiple dashes with single dash
      .toLowerCase()

    const bucketName = "campaign-files"

    const filePath = `${fileType}/${Date.now()}-${sanitizedFileName}`

    const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(filePath)

    if (error) {
      console.error("[v0] Error creating signed URL:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
      path: data.path,
      token: data.token,
    })
  } catch (error) {
    console.error("[v0] Error in upload route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
