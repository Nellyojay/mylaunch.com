import { useNavigate, useParams } from "react-router-dom";
import { MentorHeader } from "../components/mentor-header";
import { MentorProfile } from "../components/mentor-profile";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import ScrollToTop from "../constants/scrollToTop";
import { useMentorshipData } from "../contexts/mentorshipContext";
import { PostCard } from "../components/PostCard";
import { useStartup } from "../contexts/StartupProfileContext";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useUserData } from "../contexts/userDataContext";
import Loader from "../constants/loader";

export default function MentorshipPage() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { currentUser } = useUserData();
  const { mentorshipData } = useMentorshipData();
  const { posts, handleDeletePost, fetchStartupPosts } = useStartup();

  const pageData = mentorshipData?.find(m => m.id === id)
  const mentorshipPosts = posts.filter(p => p.mentorship_id === id)
  const isOwner = Boolean(currentUser?.auth_id === user?.id && pageData?.users.id === currentUser?.id)

  useEffect(() => {
    fetchStartupPosts();
  }, [id])

  if (!id || !user || !posts || !currentUser || !pageData) {
    <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />

      {/* Header */}
      <MentorHeader
        topic={pageData?.topic}
        imageUrl={pageData?.image_url}
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

        {isOwner && (
          <button
            onClick={() => navigate(`/mentorship-page/${pageData?.id}/edit`)}
            className="flex justify-center items-center text-blue-400 hover:text-blue-600 border-2 border-blue-400 hover:border-blue-600 bg-blue-50 rounded-lg py-1 px-4 gap-2"
          >
            <Edit size={18} />
            <span>Edit page</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Mentor Profile */}
        <div className="mb-8">
          <MentorProfile
            name={pageData?.users.full_name}
            userId={pageData?.users.id}
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
            {isOwner && (
              <button
                onClick={() => navigate(`/mentorship-page/${id}/add-post`)}
                className="flex justify-center items-center text-blue-400 hover:text-blue-600 border-2 border-blue-400 hover:border-blue-600 bg-blue-50 rounded-lg py-1 px-4 font-medium gap-2"
              >
                <Plus size={18} />
                <span className="hidden md:block">Create post</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {mentorshipPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                deletePost={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}