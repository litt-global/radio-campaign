"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Download, ArrowRight, X, LogOut, Loader2, Menu } from "lucide-react"
import { getSubmissionsByPackage, updateSubmissionStatus } from "@/app/actions/admin"
import { logout } from "@/app/actions/auth"
import { StripeModeIndicator } from "@/components/stripe-mode-badge"

type PageType = "spark" | "wave" | "prime" | "exec" | "icon"
type ViewType = "new" | "programmed"

type Submission = {
  id: number
  artist_name: string
  instagram_handle: string
  email: string
  phone: string
  package_name: string
  status: string
  notes?: string
  created_at: string
  uploaded_files: Array<{
    file_type: string
    file_url: string
  }>
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<PageType>("spark")
  const [activeView, setActiveView] = useState<ViewType>("new")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showNotesModal, setShowNotesModal] = useState(false)
  const [currentSubmissionId, setCurrentSubmissionId] = useState<number | null>(null)
  const [programmingNotes, setProgrammingNotes] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

  const pages = [
    { id: "spark" as PageType, name: "Spark", color: "from-pink-500 to-purple-500" },
    { id: "wave" as PageType, name: "Wave", color: "from-purple-500 to-pink-500" },
    { id: "prime" as PageType, name: "Prime", color: "from-pink-600 to-purple-600" },
    { id: "exec" as PageType, name: "Exec", color: "from-purple-600 to-pink-600" },
    { id: "icon" as PageType, name: "Icon", color: "from-pink-700 to-purple-700" },
  ]

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true)
      try {
        const data = await getSubmissionsByPackage(activePage, activeView)
        setSubmissions(data)
      } catch (error) {
        console.error("[v0] Error loading submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [activePage, activeView])

  const getFileUrl = (submission: Submission, fileType: string) => {
    return submission.uploaded_files?.find((f) => f.file_type === fileType)?.file_url || ""
  }

  const handleMoveToProgrammed = (submissionId: number) => {
    setCurrentSubmissionId(submissionId)
    setShowNotesModal(true)
    setProgrammingNotes("")
  }

  const handleSubmitNotes = () => {
    if (!programmingNotes.trim()) {
      alert("Please enter programming notes")
      return
    }
    setShowNotesModal(false)
    setShowConfirmation(true)
  }

  const handleConfirmMove = async () => {
    if (currentSubmissionId) {
      try {
        await updateSubmissionStatus(currentSubmissionId, "programmed", programmingNotes)
        const data = await getSubmissionsByPackage(activePage, activeView)
        setSubmissions(data)
      } catch (error) {
        console.error("[v0] Error updating submission:", error)
        alert("Failed to update submission status")
      }
    }
    setShowConfirmation(false)
    setCurrentSubmissionId(null)
    setProgrammingNotes("")
  }

  const handleCancelMove = () => {
    setShowNotesModal(false)
    setShowConfirmation(false)
    setCurrentSubmissionId(null)
    setProgrammingNotes("")
  }

  const handleDownloadAll = async (submission: Submission) => {
    const files = [
      { url: getFileUrl(submission, "song"), name: "song.mp3" },
      { url: getFileUrl(submission, "intro_liner"), name: "intro-liner.mp3" },
      { url: getFileUrl(submission, "cover_image"), name: "cover-image.jpg" },
    ]

    const pronunciationUrl = getFileUrl(submission, "pronunciation")
    if (pronunciationUrl) {
      files.push({ url: pronunciationUrl, name: "artist-pronunciation.mp3" })
    }

    for (const file of files) {
      if (!file.url) continue

      try {
        const response = await fetch(file.url)
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
        await new Promise((resolve) => setTimeout(resolve, 300))
      } catch (error) {
        console.error(`Failed to download ${file.name}:`, error)
      }
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true)
  }

  const handleConfirmLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Image
              src="/images/design-mode/LITT%20Live%20logo%20new.png"
              alt="LITT Live"
              width={150}
              height={75}
              className="h-8 md:h-12 w-auto"
            />
            <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent text-xs md:text-sm"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 min-h-[calc(100vh-73px)] border-r border-gray-800 bg-black/95 lg:bg-black/30 p-6 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Campaign Tiers</p>
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setActivePage(page.id)
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activePage === page.id
                    ? `bg-gradient-to-r ${page.color} text-white shadow-lg`
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="font-semibold">{page.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment Mode</p>
            <StripeModeIndicator />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent mb-2">
                {pages.find((p) => p.id === activePage)?.name}
              </h2>
              <p className="text-sm md:text-base text-gray-400">Campaign management and analytics</p>
            </div>

            {/* Toggle buttons for New Submissions and Programmed */}
            <div className="flex gap-2 md:gap-4 mb-6">
              <button
                onClick={() => setActiveView("new")}
                className={`flex-1 px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                  activeView === "new"
                    ? "bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                New Submissions
              </button>
              <button
                onClick={() => setActiveView("programmed")}
                className={`flex-1 px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${
                  activeView === "programmed"
                    ? "bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                Programmed
              </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-8 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto text-[#E93CAC] animate-spin" />
                    <p className="text-gray-400">Loading submissions...</p>
                  </div>
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-pink-500/50 transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Cover Image */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                          <Image
                            src={getFileUrl(submission, "cover_image") || "/placeholder.svg"}
                            alt="Single Cover"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover w-full max-w-[200px]"
                          />
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 space-y-4">
                          {/* Artist Name */}
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{submission.artist_name}</h3>
                          </div>

                          {/* Audio Players */}
                          <div className="space-y-3">
                            {getFileUrl(submission, "song") && (
                              <div>
                                <label className="text-xs md:text-sm font-semibold text-pink-400 mb-1 block">
                                  Song (MP3)
                                </label>
                                <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                  <source src={getFileUrl(submission, "song")} type="audio/mpeg" />
                                </audio>
                              </div>
                            )}

                            {getFileUrl(submission, "intro_liner") && (
                              <div>
                                <label className="text-xs md:text-sm font-semibold text-pink-400 mb-1 block">
                                  Artist Intro Liner (MP3)
                                </label>
                                <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                  <source src={getFileUrl(submission, "intro_liner")} type="audio/mpeg" />
                                </audio>
                              </div>
                            )}

                            {getFileUrl(submission, "pronunciation") && (
                              <div>
                                <label className="text-xs md:text-sm font-semibold text-pink-400 mb-1 block">
                                  Artist Name Pronunciation (MP3)
                                </label>
                                <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                  <source src={getFileUrl(submission, "pronunciation")} type="audio/mpeg" />
                                </audio>
                              </div>
                            )}
                          </div>

                          {/* Contact Information */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Instagram
                              </label>
                              <p className="text-white text-sm md:text-base break-words">
                                {submission.instagram_handle}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Email
                              </label>
                              <p className="text-white text-sm break-words">{submission.email}</p>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Contact
                              </label>
                              <p className="text-white text-sm md:text-base">{submission.phone}</p>
                            </div>
                          </div>

                          {submission.status === "programmed" && submission.notes && (
                            <div className="pt-4 border-t border-gray-700">
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                                Programming Notes
                              </label>
                              <p className="text-sm md:text-base text-white bg-gray-900/50 p-3 rounded-lg">
                                {submission.notes}
                              </p>
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Button
                              onClick={() => handleDownloadAll(submission)}
                              className="bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] hover:from-[#D02A9C] hover:to-[#963AB7] text-white text-sm md:text-base"
                            >
                              <Download className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                              Download All Files
                            </Button>

                            {submission.status === "new" && (
                              <Button
                                onClick={() => handleMoveToProgrammed(submission.id)}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base"
                              >
                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                                Move to Programmed
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">{pages.find((p) => p.id === activePage)?.name[0]}</span>
                    </div>
                    <p className="text-gray-400 text-lg">
                      No {activeView === "new" ? "new submissions" : "programmed submissions"} yet
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showNotesModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
                Programming Notes
              </h3>
              <button onClick={handleCancelMove} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                  Enter programming details and notes
                </label>
                <textarea
                  value={programmingNotes}
                  onChange={(e) => setProgrammingNotes(e.target.value)}
                  placeholder="e.g., Scheduled for rotation on stations 1-5, added to morning drive playlist..."
                  className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleCancelMove}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitNotes}
                  className="bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] hover:from-[#D02A9C] hover:to-[#963AB7] text-white"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md w-full">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] rounded-full flex items-center justify-center">
                <ArrowRight className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Confirm Move</h3>
                <p className="text-gray-400">Are you sure you want to move this submission to Programmed?</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-left">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Programming Notes
                </label>
                <p className="text-white text-sm">{programmingNotes}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCancelMove}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmMove}
                  className="flex-1 bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] hover:from-[#D02A9C] hover:to-[#963AB7] text-white"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md w-full">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] rounded-full flex items-center justify-center">
                <LogOut className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Confirm Logout</h3>
                <p className="text-gray-400">Are you sure you want to log out of the admin dashboard?</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCancelLogout}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmLogout}
                  className="flex-1 bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] hover:from-[#D02A9C] hover:to-[#963AB7] text-white"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
