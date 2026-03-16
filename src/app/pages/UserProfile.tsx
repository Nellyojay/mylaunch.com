import { Navbar } from '../components/Navbar';
import { StartupCard } from '../components/StartupCard';
import { formatDate } from '../constants/dateFormat';
import { useAuth } from '../contexts/authContext';
import { useUserData } from '../contexts/userDataContext';
import { mockStartups } from '../data/mockData';
import { Calendar, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function UserProfile() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { logout } = useAuth()

  // In a real app, we'd fetch user data based on id
  const userStartups = mockStartups.slice(0, 3); // Mock: show first 3 startups

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center shadow-lg">
              <span className="text-5xl font-bold text-white">{userData?.full_name.charAt(0) || 'U'}</span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData?.full_name}</h1>
              <p className="text-lg text-gray-600 mb-4">
                Young entrepreneur passionate about innovation and building great products
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(userData?.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{userData?.start_ups} Startups</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg">
                Follow
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium">
                Message
              </button>
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
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="md:text-3xl font-bold text-blue-600 mb-1">{userData?.start_ups}</div>
            <div className="text-gray-600 text-xs md:text-sm">Startups</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="md:text-3xl font-bold text-blue-600 mb-1">{userData?.followers}</div>
            <div className="text-gray-600 text-xs md:text-sm">Followers</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="md:text-3xl font-bold text-blue-600 mb-1">
              {userData?.likes || 0}
            </div>
            <div className="text-gray-600 text-xs md:text-sm">Total Likes</div>
          </div>
        </div>

        {/* Startups Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Startups</h2>
            <Link
              to="/create"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              + Create New
            </Link>
          </div>

          {userStartups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
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