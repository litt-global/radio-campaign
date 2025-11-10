"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveCampaignPurchase(formData: {
  packageName: string
  packagePrice: string
  artistName: string
  instagramHandle: string
  email: string
  phone: string
  songUrl: string
  coverImageUrl: string
  introLinerUrl: string
  pronunciationUrl?: string
  cardName: string
  cardLast4: string
  paymentIntentId: string
}) {
  const supabase = await createClient()

  try {
    const numericAmount = Number.parseFloat(formData.packagePrice)

    // Insert campaign purchase
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns_purchased")
      .insert({
        package_name: formData.packageName,
        package_price: numericAmount,
        artist_name: formData.artistName,
        instagram_handle: formData.instagramHandle,
        email: formData.email,
        phone: formData.phone,
        status: "new",
      })
      .select()
      .single()

    if (campaignError) throw campaignError

    const { error: paymentError } = await supabase.from("payments").insert({
      campaign_id: campaign.id,
      amount: numericAmount,
      cardholder_name: formData.cardName || "Stripe Customer",
      card_last_four: formData.cardLast4,
      payment_status: "completed",
      payment_method: "card",
      transaction_id: formData.paymentIntentId,
    })

    if (paymentError) throw paymentError

    // Insert uploaded files
    const files = [
      { type: "song", url: formData.songUrl, name: "song.mp3" },
      { type: "cover_image", url: formData.coverImageUrl, name: "cover.jpg" },
      { type: "intro_liner", url: formData.introLinerUrl, name: "intro.mp3" },
    ]

    if (formData.pronunciationUrl) {
      files.push({ type: "pronunciation", url: formData.pronunciationUrl, name: "pronunciation.mp3" })
    }

    const { error: filesError } = await supabase.from("uploaded_files").insert(
      files.map((file) => ({
        campaign_id: campaign.id,
        file_type: file.type,
        file_url: file.url,
        file_name: file.name,
      })),
    )

    if (filesError) throw filesError

    return { success: true, campaignId: campaign.id }
  } catch (error) {
    console.error("[v0] Error saving campaign:", error)
    return { success: false, error: "Failed to save campaign purchase" }
  }
}
