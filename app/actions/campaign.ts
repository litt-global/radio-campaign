"use server"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function createCampaignPurchase(data: {
  packageName: string
  packagePrice: string
  artistName: string
  instagram: string
  email: string
  phone: string
  cardholderName: string
  cardNumber: string
  files: {
    song: { name: string; size: number; url: string }
    cover: { name: string; size: number; url: string }
    intro: { name: string; size: number; url: string }
    pronunciation?: { name: string; size: number; url: string }
  }
}) {
  try {
    // Insert campaign purchase
    const campaignResult = await sql`
      INSERT INTO campaigns_purchased (
        package_name, 
        package_price, 
        artist_name, 
        instagram_handle, 
        email, 
        phone
      )
      VALUES (
        ${data.packageName},
        ${data.packagePrice},
        ${data.artistName},
        ${data.instagram},
        ${data.email},
        ${data.phone}
      )
      RETURNING id
    `

    const campaignId = campaignResult[0].id

    // Get last 4 digits of card
    const cardLastFour = data.cardNumber.replace(/\s/g, "").slice(-4)

    // Insert payment record
    await sql`
      INSERT INTO payments (
        campaign_id,
        cardholder_name,
        card_last_four,
        payment_status,
        amount
      )
      VALUES (
        ${campaignId},
        ${data.cardholderName},
        ${cardLastFour},
        'completed',
        ${data.packagePrice}
      )
    `

    // Insert file records
    await sql`
      INSERT INTO uploaded_files (campaign_id, file_type, file_url, file_name, file_size)
      VALUES 
        (${campaignId}, 'song', ${data.files.song.url}, ${data.files.song.name}, ${data.files.song.size}),
        (${campaignId}, 'cover', ${data.files.cover.url}, ${data.files.cover.name}, ${data.files.cover.size}),
        (${campaignId}, 'intro', ${data.files.intro.url}, ${data.files.intro.name}, ${data.files.intro.size})
    `

    // Insert pronunciation file if provided
    if (data.files.pronunciation) {
      await sql`
        INSERT INTO uploaded_files (campaign_id, file_type, file_url, file_name, file_size)
        VALUES (${campaignId}, 'pronunciation', ${data.files.pronunciation.url}, ${data.files.pronunciation.name}, ${data.files.pronunciation.size})
      `
    }

    return { success: true, campaignId }
  } catch (error) {
    console.error("[v0] Error creating campaign purchase:", error)
    return { success: false, error: "Failed to create campaign purchase" }
  }
}
