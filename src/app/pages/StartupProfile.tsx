import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { PostCard } from '../components/PostCard';
import { mockStartups, startupExtendedData } from '../data/mockData';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Heart,
  UserPlus,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar
} from 'lucide-react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { useAuth } from '../contexts/authContext';

export function StartupProfile() {
  const { session } = useAuth();
  const { id } = useParams();
  const startup = mockStartups.find(s => s.id === Number(id));
  const extendedData = startupExtendedData[Number(id)];

  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (!startup || !extendedData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showAuth={false} />
        <div className="pt-24 text-center">
          <h1 className="text-2xl text-gray-900">Startup not found</h1>
          <Link to="/feed" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuth={false} />

      <main className="max-w-4xl mx-auto pt-16 pb-12">
        {/* Banner Image */}
        <div className="relative w-full h-48 md:h-64 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600">
          <img
            src={extendedData.banner}
            alt={`${startup.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Header Section */}
        <div className="bg-white -mt-16 mx-4 rounded-3xl shadow-lg p-6 relative z-10">
          {/* Logo overlapping banner */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center shadow-xl -mt-14 border-4 border-white">
              <span className="text-4xl font-bold text-white">{startup.name[0]}</span>
            </div>

            <div className="flex-1 text-center md:text-left mt-2">
              {/* Startup Name and Verified Badge */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {startup.name}
              </h1>

              {/* Founder Name */}
              <p className="text-lg text-gray-600 mb-2">
                Founded by {startup.founder}
              </p>

              {/* Category and Location */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {startup.category}
                </span>
                <span className="flex items-center space-x-1 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>{extendedData.location}</span>
                </span>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{extendedData.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <a href={`https://${extendedData.website}`} className="text-blue-600 hover:underline">
                    {extendedData.website}
                  </a>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {startup.description}
              </p>

              <div className='flex gap-6'>
                <p className='text-gray-600'>Startups <strong>3</strong></p>
                <p className='text-gray-600'>Followers <strong>12</strong></p>
                <p className='text-gray-600'>Likes <strong>45</strong></p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <button
              onClick={() => setFollowing(!following)}
              disabled={!session}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${following
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                }`}
            >
              <UserPlus className="w-5 h-5" />
              <span>{following ? 'Following' : 'Follow'}</span>
            </button>

            <button
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact</span>
            </button>

            <button
              onClick={() => setLiked(!liked)}
              disabled={!session}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${liked
                ? 'bg-red-50 text-red-500 border-2 border-red-200'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
              <span>Like</span>
            </button>

            <button
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {/* View More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="w-full mt-4 flex items-center justify-center space-x-2 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium"
          >
            <span>{showMore ? 'View Less' : 'View More About Startup'}</span>
            {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {/* Expandable Details Section */}
          {showMore && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Description</h3>
                <p className="text-gray-700 leading-relaxed">{extendedData.fullDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{extendedData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{extendedData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <a href={`https://${extendedData.website}`} className="text-blue-600 hover:underline">
                        {extendedData.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Business Details</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{extendedData.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Founded in {extendedData.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>Founder: {startup.founder}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Social Media</h3>
                <div className="flex space-x-3">
                  <a
                    title='X'
                    href="#"
                    className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <BsTwitterX className="w-5 h-5" />
                  </a>
                  <a
                    title='Facebook'
                    href="#"
                    className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    title='WhatsApp'
                    href="#"
                    className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Posts Feed Section */}
        <div className="mt-8 px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Posts</h2>
            <p className="text-gray-600">Latest updates from {startup.name}</p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extendedData.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Empty State */}
          {extendedData.posts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md">
              <p className="text-gray-500">No posts yet. Check back later!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}