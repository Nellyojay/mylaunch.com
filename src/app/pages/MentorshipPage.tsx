import { MentorHeader } from "../components/mentor-header";
import { MentorPost } from "../components/mentor-post";
import { MentorProfile } from "../components/mentor-profile";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MentorHeader
        topic="Web Development Mentorship"
        description="Learn modern web development practices, from frontend frameworks to full-stack architecture. Get personalized guidance and insights from years of industry experience."
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Mentor Profile */}
        <div className="mb-8">
          <MentorProfile
            name="Sarah Johnson"
            title="Senior Full-Stack Developer & Tech Lead"
            location="San Francisco, CA"
            imageUrl="https://images.unsplash.com/photo-1621533463370-837f20c6c889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ4Nzg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            bio="Passionate about helping developers grow their skills and advance their careers. Specializing in React, Node.js, and system design with 10+ years of experience building scalable web applications."
            experience="10+ years"
            students={150}
            rating={4.9}
          />
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-xl md:text-2xl mb-4">Recent Posts & Insights</h2>
          <div className="space-y-4">
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