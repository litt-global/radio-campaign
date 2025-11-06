import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

// 4.5 MB limit for server uploads (Vercel Functions limit)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024 // 4.5 MB in bytes

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds the maximum limit of 4.5 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        },
        { status: 413 },
      )
    }

    console.log("[v0] Uploading file:", file.name, "Size:", (file.size / (1024 * 1024)).toFixed(2), "MB")

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    console.log("[v0] File uploaded successfully:", blob.url)

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error) {
    console.error("[v0] Error uploading to blob:", error)

    const errorMessage = error instanceof Error ? error.message : "Failed to upload file"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
