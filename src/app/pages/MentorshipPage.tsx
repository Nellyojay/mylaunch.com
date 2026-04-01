import { useNavigate, useParams } from "react-router-dom";
import { MentorHeader } from "../components/mentor-header";
import { MentorPost } from "../components/mentor-post";
import { MentorProfile } from "../components/mentor-profile";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import ScrollToTop from "../constants/scrollToTop";
import { useMentorshipData } from "../contexts/mentorshipContext";

export default function MentorshipPage() {
  const mentorPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      content:
        "Hooks have revolutionized how we write React components. In this post, I'll share my top tips for mastering useState and useEffect, along with common pitfalls to avoid when you're just starting out.",
      date: "2 days ago",
      likes: 124,
      comments: 18,
      mediaType: "image" as const,
      mediaUrl: "https://images.unsplash.com/photo-1653387319597-84bde7e5368e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGUlMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NzQ4Nzg5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Building Your First Full-Stack Application",
      content:
        "Ready to take the leap from frontend to full-stack? Here's a step-by-step guide on how to approach your first project, from choosing the right tech stack to deploying your application to production.",
      date: "5 days ago",
      likes: 89,
      comments: 12,
      mediaType: "video" as const,
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 3,
      title: "The Importance of Code Reviews",
      content:
        "Code reviews aren't just about finding bugs—they're about learning and growing as a team. I'll share my framework for conducting effective code reviews that help everyone improve.",
      date: "1 week ago",
      likes: 156,
      comments: 24,
      mediaType: "image" as const,
      mediaUrl: "https://images.unsplash.com/photo-1759884247387-a5d791ffb2bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29kZSUyMHJldmlldyUyMG1lZXRpbmd8ZW58MXx8fHwxNzc0ODc4OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      title: "Understanding Async/Await in JavaScript",
      content:
        "Asynchronous programming can be tricky, but it doesn't have to be. Let's break down async/await with practical examples and see how it makes working with promises much cleaner and easier to understand.",
      date: "2 weeks ago",
      likes: 203,
      comments: 31,
      mediaType: "image" as const,
      mediaUrl: "https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcHJvZ3JhbW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzc0ODIwNzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      title: "Career Advice: From Junior to Senior Developer",
      content:
        "Making the transition from junior to senior developer takes more than just technical skills. In this post, I share the soft skills, mindset shifts, and strategic moves that helped me advance in my career.",
      date: "3 weeks ago",
      likes: 271,
      comments: 45,
      mediaType: "image" as const,
      mediaUrl: "https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzQ4NTkxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const { mentorshipData } = useMentorshipData();

  const pageData = mentorshipData?.find(m => m.id === id)
  console.log(pageData)

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />

      {/* Header */}
      <MentorHeader
        topic={pageData?.topic}
        description={pageData?.description}
      />

      <div className="flex justify-between items-center px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => navigate(`/mentorship-page/${pageData?.id}/edit`)}
          className="flex justify-center items-center text-blue-400 hover:text-blue-600 border-2 border-blue-400 hover:border-blue-600 bg-blue-50 rounded-lg py-1 px-4 gap-2"
        >
          <Edit size={18} />
          <span>Edit page</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-4">
        {/* Mentor Profile */}
        <div className="mb-8">
          <MentorProfile
            name={pageData?.users.full_name}
            title={pageData?.mentor_title}
            location={pageData?.location}
            imageUrl={pageData?.users.profile_image}
            bio={pageData?.mentorship_bio}
            experience={pageData?.experience}
            rating={pageData?.rating}
          />
        </div>

        {/* Posts Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl">Recent Posts & Insights</h2>
            <button
              onClick={() => navigate(`/mentorship-page/${id}/add-post`)}
              className="flex justify-center items-center text-blue-400 hover:text-blue-600 border-2 border-blue-400 hover:border-blue-600 bg-blue-50 rounded-lg py-1 px-4 font-medium gap-2"
            >
              <Plus size={18} />
              <span className="hidden md:block">Create post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {mentorPosts.map((post) => (
              <MentorPost
                key={post.id}
                title={post.title}
                content={post.content}
                date={post.date}
                likes={post.likes}
                comments={post.comments}
                mediaType={post.mediaType}
                mediaUrl={post.mediaUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}