import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { StartupCard } from '../components/StartupCard';
import { formatDate } from '../constants/dateFormat';
import { useAuth } from '../contexts/authContext';
import { useStartup } from '../contexts/StartupProfileContext';
import { useUserData } from '../contexts/userDataContext';
import { Calendar, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { getImageUrl } from '../constants/imageHandler';

export function UserProfile() {
  const navigate = useNavigate();
  const { startupData } = useStartup();
  const { userData, setSelectedProfile, selectedProfile } = useUserData();
  const { logout, user } = useAuth();

  const profileId = selectedProfile || userData?.id || user?.id || null;
  const isOwner = Boolean(
    profileId &&
    userData?.id === profileId &&
    userData?.auth_id === user?.id
  );

  useEffect(() => {
    if (profileId) {
      setSelectedProfile(profileId);
    }
  }, [profileId, setSelectedProfile]);

  const userStartups = startupData?.filter(s => s.user_id === profileId) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData?.full_name}</h1>
              <p className="text-sm text-gray-500 mb-4">@{userData?.user_name}</p>
              <p className="text-lg text-gray-600 mb-4">
                {userData?.bio || 'This user has not added a bio yet.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined MyLaunch {formatDate(userData?.created_at, false)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{userStartups?.length} Startup{userStartups?.length === 1 ? '' : 's'}</span>
                </div>
              </div>
            </div>

            {isOwner ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile/edit"
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Startups</h2>
            {isOwner && (
              <Link
                to="/create"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Create New
              </Link>
            )}
          </div>

          {(userStartups ?? []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userStartups?.map((startup) => (
                <StartupCard key={startup.id} startup={startup} userId={startup.user_id} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-gray-500 mb-4">You haven't created any startups yet</p>
              <Link
                to="/create"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Create Your First Startup
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}