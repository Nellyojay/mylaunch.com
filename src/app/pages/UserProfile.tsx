import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { StartupCard } from '../components/StartupCard';
import { formatDate } from '../constants/dateFormat';
import { useAuth } from '../contexts/authContext';
import { useStartup } from '../contexts/StartupProfileContext';
import { useUserData } from '../contexts/userDataContext';
import { Calendar, Briefcase, Bookmark, Star } from 'lucide-react';
import { getImageUrl } from '../constants/imageHandler';
import ScrollToTop from '../constants/scrollToTop';
import Loader from '../constants/loader';
import supabase from '../supabaseClient';
import { PostCard } from '../components/PostCard';

type Tab = 'mine' | 'favorites' | 'savedPosts';

type Favorites = {
  startup_id: string
}

type SavedPosts = {
  post_id: string | number;
}

export function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { startupData, posts, fetchStartupPosts, handleDeletePost } = useStartup();
  const { userData, setSelectedProfile, selectedProfile } = useUserData();
  const { logout, user } = useAuth();

  const [startupsFollwing, setStartupsFollowing] = useState<number | null>(0)
  const [tab, setTab] = useState<Tab>('mine');
  const [favoritesId, setFavoritesId] = useState<Favorites[]>([]);
  const [savedPosts, setSavedPosts] = useState<SavedPosts[]>([])

  const profileId = id || selectedProfile || userData?.id || user?.id || null;
  const isOwner = Boolean(
    profileId &&
    userData?.id === profileId &&
    userData?.auth_id === user?.id
  );

  const fetchFollowedBusinesses = async () => {
    if (!userData?.id) return;

    const { data, error } = await supabase
      .from('follows')
      .select('user_id')
      .eq('user_id', userData?.id)

    if (error) {
      return;
    } else {
      setStartupsFollowing(data.length)
    }
  };

  const fetchFavoriteBusinesses = async () => {
    if (!userData?.id) return;

    const { data, error } = await supabase
      .from('favorites')
      .select('startup_id')
      .eq('user_id', userData?.id);

    if (error) {
      return;
    } else {
      setFavoritesId(data || [])
    }
  };

  const fetchSavedPosts = async () => {
    if (!userData?.id) return;

    const { data, error } = await supabase
      .from('saves')
      .select('post_id')
      .eq('user_id', userData?.id);

    if (error) {
      return;
    } else {
      setSavedPosts(data || [])
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchStartupPosts();
      fetchSavedPosts();
      fetchFavoriteBusinesses();
      fetchFollowedBusinesses();
      setSelectedProfile(profileId);
    }
  }, [profileId, setSelectedProfile]);

  const favIds = favoritesId.map(f => f.startup_id);
  const favStartups = startupData?.filter(s => favIds.includes(s.id));

  const savedPostIds = savedPosts.map(s => s.post_id);
  const savPosts = posts?.filter(p => savedPostIds.includes(p.id));

  const userStartups = startupData?.filter(s => s.user_id === profileId) || [];

  if (!userData || !profileId || !startupData) {
    return <Loader />;
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <ScrollToTop />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            {userData?.profile_image ? (
              <img
                src={getImageUrl(userData.profile_image) || undefined}
                alt="Profile Picture"
                className="max-w-50 max-h-50 rounded-lg object-contain bg-gray-200 shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-white">{userData?.full_name.charAt(0) || 'U'}</span>
              </div>
            )}

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{userData?.full_name}</h1>
              <p className="text-sm text-gray-400 mb-4">@{userData?.user_name || 'Username'}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {userData.user_roles && userData.user_roles.length > 0 ? (
                  userData.user_roles.map((role, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {role}
                    </span>
                  ))
                ) : null}
              </div>

              <p className="text-gray-700">
                {userData?.bio || 'This user has not added a bio yet.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined MyLaunch {formatDate(userData?.created_at, false)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{userStartups?.length} Business{userStartups?.length === 1 ? '' : 'es'}</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:block text-gray-500 mt-2">
                <Link to={'/following'} className="text-blue-600 hover:text-blue-400">
                  Businesses Following <span className='font-semibold text-gray-800'>{startupsFollwing}</span>
                </Link>
              </div>
            </div>

            {isOwner ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={`/profile/${profileId}/edit`}
                  className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg">
                  Edit profile
                </Link>
                <button
                  className="px-6 py-2 border border-red-700 text-red-700 rounded-full hover:bg-red-100 transition-colors font-medium"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Log out
                </button>
              </div>
            ) : null}

          </div>
        </div>

        {/* Startups Section */}
        <div>
          <div className="sticky top-18 h-fit z-50 flex items-center justify-between mb-6">
            <div className='flex text-gray-500 space-x-2 border-2 border-gray-400 rounded-lg py-1 px-4 mr-1 justify-between not-md:w-full backdrop-blur-xl'>
              <button
                onClick={() => setTab('mine')}
                className={`font-bold cursor-pointer md:hover:text-gray-800 transition-all duration-200 ${tab === 'mine' && 'text-gray-800 border-b-2'}`}
              >Mine</button>

              <div className='flex items-center justify-center gap-1 md:hover:text-gray-800'>
                <Star className='fill-gray-500' size={18} color='' />
                <button
                  onClick={() => setTab('favorites')}
                  className={`font-semibold cursor-pointer transition-all duration-200 ${tab === 'favorites' && 'text-gray-800 border-b-2'}`}
                >Businesses</button>
              </div>

              <div className='flex items-center gap-1 md:hover:text-gray-800'>
                <Bookmark className='fill-gray-500' size={18} color='' />
                <button
                  onClick={() => setTab('savedPosts')}
                  className={`font-semibold cursor-pointer transition-all duration-200 ${tab === 'savedPosts' && 'text-gray-800 border-b-2'}`}
                >Posts</button>
              </div>
            </div>

            {isOwner && (
              <Link
                to="/create"
                className="flex justify-center items-center text-blue-600 hover:text-blue-400 border-2 border-blue-600 hover:border-blue-400 bg-blue-50 rounded-lg py-1 px-4 font-medium"
              >
                +
                <span className='hidden md:block'>Create Business</span>
              </Link>
            )}
          </div>

          {tab === 'mine' && (
            (userStartups ?? []).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userStartups?.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} userId={startup.user_id} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-gray-500 mb-4">No Businesses created yet</p>
                {isOwner && (
                  <Link
                    to="/create"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Your First Business Page
                  </Link>
                )}
              </div>
            )
          )}
          {tab === 'favorites' && (
            (favStartups ?? []).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favStartups?.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} userId={startup.user_id} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-gray-500 mb-4">User has no favorite businesses yet.</p>
              </div>
            )
          )}
          {tab === 'savedPosts' && (
            (savPosts ?? []).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    deletePost={() => handleDeletePost(post.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-gray-500 mb-4">User has not saved any posts yet.</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}