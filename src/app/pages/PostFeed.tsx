import { useEffect } from "react";
import { Navbar } from "../components/Navbar"
import { PostCard } from "../components/PostCard";
import { useStartup } from "../contexts/StartupProfileContext";
import { useUserData } from "../contexts/userDataContext";
import Loader from "../constants/loader";

function PostFeed() {
  const { loadingPosts, posts, handleDeletePost, fetchStartupPosts } = useStartup();
  const { currentUser } = useUserData();

  useEffect(() => {
    fetchStartupPosts();
  }, [])

  const isOwner = currentUser?.id === posts.find(p => p.user_id)

  if (loadingPosts || !posts) {
    return <Loader />
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-12">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">

        <div className="sticky top-18 h-fit hidden md:block col-span-12 md:col-span-3 space-y-4">

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold text-lg">John Nelson</p>
            <p>Founder</p>
            <p>Kampala</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold">Connections</p>
            <p>245</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold">Startups</p>
            <p>3 active</p>
          </div>

        </div>

        <div className="col-span-12 md:col-span-6 space-y-2">

          {!loadingPosts && posts.length > 0 && (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                deletePost={() => handleDeletePost(post.id)}
                isOwner={isOwner}
              />
            ))
          )}
        </div>

        <div className="sticky top-18 h-fit hidden md:block col-span-12 md:col-span-3 space-y-4">

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold">Trending Startup</p>
            <p>AgroTech Africa</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold">Suggested Connection</p>
            <p>Sarah K.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-semibold">Events</p>
            <p>Startup Meetup Kampala</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default PostFeed;