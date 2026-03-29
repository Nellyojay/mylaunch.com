import { Navbar } from "./Navbar"

function CreateMentorshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4 pt-24 pb-20">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Create Mentorship Page</h1>
          <p className="text-gray-600 mb-6">This is a placeholder page for creating a mentorship profile. More features will be added soon!</p>

          <div className="flex justify-center">
            <img src="/mentorship_placeholder.svg" alt="Mentorship Placeholder" className="w-full max-w-md" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateMentorshipPage