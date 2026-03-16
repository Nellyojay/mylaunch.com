import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Rocket, Users, TrendingUp } from 'lucide-react';

export function Landing() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar showAuth={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Startups by
            <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2 pb-2">Young Graduates</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Support and discover businesses created by young entrepreneurs. Connect with the next generation of innovators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
            >
              Create Account
            </Link>
            <Link
              to="/feed"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
            >
              Explore Startups
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why GradLaunch?
            </h2>
            <p className="text-lg text-gray-600">
              The perfect platform to showcase and discover youth startups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch Your Startup</h3>
              <p className="text-gray-600">
                Share your business with the world and attract customers and supporters
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Engage</h3>
              <p className="text-gray-600">
                Build a community around your brand with likes, comments, and direct support
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow Your Business</h3>
              <p className="text-gray-600">
                Get discovered by potential customers and grow your startup organically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for free and set up your profile in minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Your Startup</h3>
              <p className="text-gray-600">
                Share your business story, products, and services with beautiful images
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Discovered</h3>
              <p className="text-gray-600">
                Connect with customers and grow your startup community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of young entrepreneurs already showcasing their businesses
          </p>
          <Link
            to="/create"
            className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg font-medium inline-block shadow-xl hover:shadow-2xl"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}