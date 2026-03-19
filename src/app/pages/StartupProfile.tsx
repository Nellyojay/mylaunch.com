import { useParams, Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { LikeButton } from '../components/LikeButton';
import { CommentBox } from '../components/CommentBox';
import { mockStartups, mockComments } from '../data/mockData';
import { Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
import { BsFacebook, BsLinkedin, BsTwitterX } from 'react-icons/bs';

export function StartupProfile() {
  const { id } = useParams();
  const startup = mockStartups.find(s => s.id === Number(id));

  if (!startup) {
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

  const additionalImages = [startup.image, startup.image, startup.image, startup.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuth={false} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header Section */}
        <div
          className="bg-white rounded-2xl shadow-md p-8 mb-6 imgBackground"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">{startup.name[0]}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{startup.name}</h1>
                  <p className="text-lg text-gray-600 mb-3">Founded by {startup.founder}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {startup.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {startup.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Products Gallery */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Products & Services</h2>
              <div className="grid grid-cols-2 gap-4">
                {additionalImages.map((img, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Comments ({mockComments.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <LikeButton initialLikes={startup.likes} />
                </div>
              </div>
              <CommentBox comments={mockComments} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="break-all">contact@{startup.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Support This Startup</h2>
              <p className="text-blue-100 mb-6">
                Help {startup.founder} grow their business
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 shadow-md">
                  <Heart className="w-5 h-5" />
                  <span>Support Now</span>
                </button>
                <button className="w-full bg-blue-800 bg-opacity-50 text-white py-3 rounded-xl font-medium hover:bg-opacity-70 transition-colors flex items-center justify-center space-x-2">
                  <ExternalLink className="w-5 h-5" />
                  <span>Visit Website</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h2>
              <div className="flex space-x-3">
                <a title='Twitter' href="#" className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <BsTwitterX className="w-5 h-5" />
                </a>
                <a title='LinkedIn' href="#" className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <BsLinkedin className="w-6 h-6" />
                </a>
                <a title='Facebook' href="#" className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <BsFacebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}