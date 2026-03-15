import { Link } from 'react-router';
import { Search, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  showSearch?: boolean;
  showAuth?: boolean;
  onSearch?: (query: string) => void;
}

export function Navbar({ showSearch = false, showAuth = true, onSearch }: NavbarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">GradLaunch</span>
          </Link>

          {/* Search Bar - shown on feed page */}
          {showSearch && (
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search startups..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {showAuth ? (
              <>
                <Link to="/feed" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Explore
                </Link>
                <Link to="/#about" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">
                  About
                </Link>
                <Link to="/feed" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/create"
                  className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <Link to="/create" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Create Startup
                </Link>
                <Link to="/profile/1" className="text-gray-700 hover:text-gray-900 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}