import { cookies } from "next/headers"

const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_CREDENTIALS = {
  email: "admin@littlive.com",
  password: "1",
}

export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  // Create a simple session token (in production, use a proper session token)
  const sessionToken = Buffer.from(`${Date.now()}-admin`).toString("base64")

  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export async function getAdminSession(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession()
  return !!session
}
