"use server"

import { redirect } from "next/navigation"
import { validateAdminCredentials, createAdminSession, deleteAdminSession } from "@/lib/admin-auth"

export async function login(email: string, password: string) {
  const isValid = await validateAdminCredentials(email, password)

  if (!isValid) {
    return { error: "Invalid email or password" }
  }

  await createAdminSession()
  redirect("/admin/dashboard")
}

export async function logout() {
  await deleteAdminSession()
  redirect("/admin/login")
}
