"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Download, ArrowRight, X, LogOut } from "lucide-react"

type PageType = "spark" | "wave" | "prime" | "exec" | "icon"
type ViewType = "new" | "programmed"

type Submission = {
  id: string
  coverImage: string
  song: string
  introLiner: string
  pronunciation: string
  instagram: string
  email: string
  phone: string
  status: "new" | "programmed"
  notes?: string
  page: PageType
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState<PageType>("spark")
  const [activeView, setActiveView] = useState<ViewType>("new")

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIG%20BOOBLAY%20-%20ITS%20MA%20LIFE%20SINGLE%20COVER-4mlvABDbRSupg6Qrjkiu7jZDVUiAp1.jpg",
      song: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      introLiner:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      pronunciation:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      instagram: "@bigbooblay",
      email: "bigbooblay@gmail.com",
      phone: "+61 437 804 903",
      status: "new",
      page: "spark",
    },
    {
      id: "2",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIG%20BOOBLAY%20-%20ITS%20MA%20LIFE%20SINGLE%20COVER-4mlvABDbRSupg6Qrjkiu7jZDVUiAp1.jpg",
      song: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      introLiner:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      pronunciation:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      instagram: "@bigbooblay",
      email: "bigbooblay@gmail.com",
      phone: "+61 437 804 903",
      status: "new",
      page: "wave",
    },
    {
      id: "3",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIG%20BOOBLAY%20-%20ITS%20MA%20LIFE%20SINGLE%20COVER-4mlvABDbRSupg6Qrjkiu7jZDVUiAp1.jpg",
      song: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      introLiner:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      pronunciation:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      instagram: "@bigbooblay",
      email: "bigbooblay@gmail.com",
      phone: "+61 437 804 903",
      status: "new",
      page: "prime",
    },
    {
      id: "4",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIG%20BOOBLAY%20-%20ITS%20MA%20LIFE%20SINGLE%20COVER-4mlvABDbRSupg6Qrjkiu7jZDVUiAp1.jpg",
      song: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      introLiner:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      pronunciation:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      instagram: "@bigbooblay",
      email: "bigbooblay@gmail.com",
      phone: "+61 437 804 903",
      status: "new",
      page: "exec",
    },
    {
      id: "5",
      coverImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIG%20BOOBLAY%20-%20ITS%20MA%20LIFE%20SINGLE%20COVER-4mlvABDbRSupg6Qrjkiu7jZDVUiAp1.jpg",
      song: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      introLiner:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      pronunciation:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10112025%20%281%29-N0RgHcxIgYkYXJn5dpfzZr8nnisHVQ.mp3",
      instagram: "@bigbooblay",
      email: "bigbooblay@gmail.com",
      phone: "+61 437 804 903",
      status: "new",
      page: "icon",
    },
  ])

  const [showNotesModal, setShowNotesModal] = useState(false)
  const [currentSubmissionId, setCurrentSubmissionId] = useState<string | null>(null)
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

  const currentSubmissions = submissions.filter((sub) => sub.page === activePage && sub.status === activeView)

  const handleMoveToProgrammed = (submissionId: string) => {
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

  const handleConfirmMove = () => {
    if (currentSubmissionId) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === currentSubmissionId ? { ...sub, status: "programmed" as const, notes: programmingNotes } : sub,
        ),
      )
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
      { url: submission.song, name: "song.mp3" },
      { url: submission.introLiner, name: "intro-liner.mp3" },
      { url: submission.pronunciation, name: "artist-pronunciation.mp3" },
      { url: submission.coverImage, name: "cover-image.jpg" },
    ]

    for (const file of files) {
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

  const handleConfirmLogout = () => {
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
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LITT%20Live%20logo%20new-pLNLG6ZhK5eR1MiJ2tGFtBt8yfdDOW.png"
              alt="LITT Live"
              width={150}
              height={75}
              className="h-12 w-auto"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-[calc(100vh-73px)] border-r border-gray-800 bg-black/30 p-6">
          <nav className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Campaign Tiers</p>
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
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
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent mb-2">
                {pages.find((p) => p.id === activePage)?.name}
              </h2>
              <p className="text-gray-400">Campaign management and analytics</p>
            </div>

            {/* Toggle buttons for New Submissions and Programmed */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveView("new")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeView === "new"
                    ? "bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                New Submissions
              </button>
              <button
                onClick={() => setActiveView("programmed")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeView === "programmed"
                    ? "bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                Programmed
              </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 min-h-[500px]">
              {currentSubmissions.length > 0 ? (
                <div className="space-y-6">
                  {currentSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-pink-500/50 transition-all"
                    >
                      <div className="flex gap-6">
                        {/* Cover Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={submission.coverImage || "/placeholder.svg"}
                            alt="Single Cover"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 space-y-4">
                          {/* Audio Players */}
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-semibold text-pink-400 mb-1 block">Song (MP3)</label>
                              <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                <source src={submission.song} type="audio/mpeg" />
                              </audio>
                            </div>

                            <div>
                              <label className="text-sm font-semibold text-pink-400 mb-1 block">
                                Artist Intro Liner (MP3)
                              </label>
                              <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                <source src={submission.introLiner} type="audio/mpeg" />
                              </audio>
                            </div>

                            <div>
                              <label className="text-sm font-semibold text-pink-400 mb-1 block">
                                Artist Name Pronunciation (MP3)
                              </label>
                              <audio controls className="w-full h-10" style={{ maxWidth: "100%" }}>
                                <source src={submission.pronunciation} type="audio/mpeg" />
                              </audio>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Instagram
                              </label>
                              <p className="text-white">{submission.instagram}</p>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Email
                              </label>
                              <p className="text-white text-sm">{submission.email}</p>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                Contact
                              </label>
                              <p className="text-white text-sm">{submission.phone}</p>
                            </div>
                          </div>

                          {submission.status === "programmed" && submission.notes && (
                            <div className="pt-4 border-t border-gray-700">
                              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                                Programming Notes
                              </label>
                              <p className="text-white bg-gray-900/50 p-3 rounded-lg">{submission.notes}</p>
                            </div>
                          )}

                          <div className="pt-4 flex gap-3">
                            <Button
                              onClick={() => handleDownloadAll(submission)}
                              className="bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] hover:from-[#D02A9C] hover:to-[#963AB7] text-white"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download All Files
                            </Button>

                            {submission.status === "new" && (
                              <Button
                                onClick={() => handleMoveToProgrammed(submission.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <ArrowRight className="w-4 h-4 mr-2" />
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
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">{pages.find((p) => p.id === activePage)?.name[0]}</span>
                    </div>
                    <p className="text-gray-400 text-lg">
                      No {activeView === "new" ? "new submissions" : "programmed submissions"} yet
                    </p>
                    <p className="text-gray-500 text-sm">
                      {activeView === "new"
                        ? "New submissions will appear here"
                        : "Programmed submissions will appear here"}
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
