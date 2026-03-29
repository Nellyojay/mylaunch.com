
export function MentorshipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">

      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Scaling an Agro Startup in Africa
        </h1>
        <p className="text-gray-500">Agriculture • Mentorship</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <img src="/mentor.jpg" alt="Mentor" className="w-12 h-12 rounded-full" />

        <div>
          <p className="font-semibold">John Nelson</p>
          <p className="text-gray-500 text-sm">@johnnelson</p>
        </div>

        <button className="ml-auto px-4 py-1 bg-primary text-white rounded">
          Follow
        </button>
      </div>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <p>
          I built my agribusiness from scratch and scaled it across multiple districts...
          In this mentorship, I will guide you through funding, scaling and sustainability.
        </p>
      </div>

      <div className="space-y-6">

        <div className="border rounded-lg p-4">

          <p className="mb-3">
            Lesson 1: How to start small and scale
          </p>

          <img src="/farm.jpg" alt="Farm" className="rounded-lg mb-3" />

          <div className="flex gap-4 text-gray-500 text-sm">
            <button>❤️ Like</button>
            <button>💬 Comment</button>
            <button>🔖 Save</button>
          </div>

        </div>

      </div>

    </div>
  )
}