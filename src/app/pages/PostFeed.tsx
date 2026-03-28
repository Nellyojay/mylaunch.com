import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar"
import { PostCard } from "../components/PostCard";
import { useStartup } from "../contexts/StartupProfileContext";
import Loader from "../constants/loader";
import { useUserData } from "../contexts/userDataContext";
import { Link } from "react-router-dom";
import { getImageUrl } from "../constants/imageHandler";
import { Bookmark, User } from "lucide-react";
import { useAuth } from "../contexts/authContext";

function PostFeed() {
  const { session } = useAuth();
  const { currentUser, setSelectedProfile } = useUserData();
  const { loadingPosts, posts, handleDeletePost, fetchStartupPosts, startupData } = useStartup();
  const [visibleCount, setVisibleCount] = useState(10);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const userStartups = startupData?.filter(s => s.user_id === currentUser?.id)

  useEffect(() => {
    fetchStartupPosts();
  }, [])

  const displayedPosts = posts?.slice(0, visibleCount);

  useEffect(() => {
    if (loadingPosts || displayedPosts.length >= posts?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 10, posts?.length));
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [posts?.length, displayedPosts.length, loadingPosts]);

  if (loadingPosts || !posts) {
    return <Loader />
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-12">
      <Navbar showSearch={true} />

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-20 grid grid-cols-12 gap-4">

        <div className="sticky top-18 h-fit hidden md:block col-span-12 md:col-span-3 space-y-2">

          <div className="bg-white rounded-md shadow-sm p-4">
            {session ? (
              <Link to={`/profile/${currentUser?.id}`} onClick={() => setSelectedProfile(currentUser?.id)}>
                {currentUser?.profile_image ? (
                  <img
                    src={getImageUrl(currentUser?.profile_image) || undefined}
                    alt="Profile-image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 rounded-full object-cover text-gray-400" />
                )}
                <p className="font-semibold text-lg">{currentUser?.full_name}</p>
              </Link>
            ) : (
              <Link to={'/login'} className="gap-2">
                <User className="w-10 h-10 rounded-full object-cover" />
                <p className="font-semibold text-gray-500">Sign in to view profile</p>
              </Link>
            )}

          </div>

          {session && (
            <div className="bg-white rounded-md shadow-sm p-4 space-y-2">
              <p className="font-semibold">My Businesses ({userStartups?.length})</p>

              <div>
                {(userStartups?.length ?? 0) > 0 ? (
                  <>
                    {userStartups?.map(s => (
                      <Link
                        to={`/startup/${s.id}`}
                        className="line-clamp-1 text-xs text-gray-500 hover:underline"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </>
                ) : null}
              </div>

              <div className="flex gap-2">
                <Bookmark className="fill-black" size={18} />
                <p className="font-semibold text-xs">Saved</p>
              </div>
            </div>
          )}

        </div>

        <div className="col-span-12 md:col-span-5">
          {!loadingPosts && displayedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {displayedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  deletePost={() => handleDeletePost(post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md shadow-sm p-4 text-center">
              <p className="text-gray-500">No posts match your search.</p>
            </div>
          )}

          <div ref={loadMoreRef} className="h-4" />
          {displayedPosts.length < posts?.length && (
            <div className="text-center text-gray-500 mt-3 mb-4">Loading more posts...</div>
          )}
        </div>

        <div className="sticky top-18 h-fit hidden md:block col-span-12 md:col-span-4 space-y-2">

          <div className="bg-white rounded-md shadow-sm p-4">
            <p className="font-semibold">Trending Startup</p>
            <p className="text-gray-500">Coming soon!</p>
          </div>

          <div className="bg-white rounded-md shadow-sm p-4">
            <p className="font-semibold">Suggested Connection</p>
            <p className="text-gray-500">Coming soon!</p>
          </div>

          <div className="bg-white rounded-md shadow-sm p-4">
            <p className="font-semibold">Events</p>
            <p className="text-gray-500">Coming soon!</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default PostFeed;