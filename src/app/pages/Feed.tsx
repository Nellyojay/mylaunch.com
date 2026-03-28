import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { CategoryFilter } from '../components/CategoryFilter';
import { StartupCard } from '../components/StartupCard';
import { ArrowUpDown, User } from 'lucide-react';
import { useStartup } from '../contexts/StartupProfileContext';
import ScrollToTop from '../constants/scrollToTop';
import supabase from '../supabaseClient';
import { type userData } from '../contexts/userDataContext';
import { PostCard } from '../components/PostCard';
import { getImageUrl } from '../constants/imageHandler';
import { useNavigate } from 'react-router';

export function Feed() {
  const navigate = useNavigate();
  const { startupData, posts, handleDeletePost, fetchStartupPosts } = useStartup();
  const [users, setUsers] = useState<userData[] | undefined>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'trending'>('newest');
  const [tab, setTab] = useState<'businesses' | 'posts' | 'users'>(() => {
    const savedTab = localStorage.getItem('feedTab');
    return (savedTab as 'businesses' | 'posts' | 'users') || 'businesses';
  });

  useEffect(() => {
    if (!startupData || !posts || !users) return;

    if (tab === 'posts') {
      void fetchStartupPosts();
    };

    if (tab === 'users') {
      const fetchUsers = async () => {
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
          setUsers([]);
        } else {
          setUsers(data);
        }
      }
      void fetchUsers();
    };

  }, [tab])

  useEffect(() => {
    localStorage.setItem('feedTab', tab);
  }, [tab]);

  // Filter by category
  let filteredStartups = selectedCategory === 'All'
    ? startupData
    : startupData?.filter(startup => startup.cartegory === selectedCategory);

  let filteredPosts = tab === 'posts' ? posts : [];
  let filteredUsers = tab === 'users' ? users : [];

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredStartups = filteredStartups?.filter(
      startup =>
        startup.name.toLowerCase().includes(query) ||
        startup.founder_name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query)
    );

    filteredPosts = filteredPosts?.filter(
      post =>
        post.content.toLowerCase().includes(query) ||
        post.startups.name.toLowerCase().includes(query)
    );

    filteredUsers = filteredUsers?.filter(
      user =>
        user.full_name.toLowerCase().includes(query) ||
        user.user_roles.some(role => role.toLowerCase().includes(query))
    );
  }

  // Sort data
  switch (sortBy) {
    case 'newest':
      filteredPosts = filteredPosts?.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      filteredStartups = filteredStartups?.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    case 'likes':
      filteredPosts = filteredPosts?.slice().sort((a, b) => b.likes - a.likes);
      break;
    case 'trending':
      // Example trending algorithm: (likes + comments) / hours since posted
      filteredPosts = filteredPosts?.slice().sort((a, b) => {
        const aHours = (Date.now() - new Date(a.created_at).getTime()) / 3600000;
        const bHours = (Date.now() - new Date(b.created_at).getTime()) / 3600000;
        const aScore = (a.likes + a.saves) / Math.max(aHours, 1);
        const bScore = (b.likes + b.saves) / Math.max(bHours, 1);
        return bScore - aScore;
      });
      filteredStartups = filteredStartups?.slice().sort((a, b) => {
        const aHours = (Date.now() - new Date(a.created_at).getTime()) / 3600000;
        const bHours = (Date.now() - new Date(b.created_at).getTime()) / 3600000;
        const aScore = a.followers / Math.max(aHours, 1);
        const bScore = b.followers / Math.max(bHours, 1);
        return bScore - aScore;
      });
      break;
  }

  return (
    <div className="min-h-screen">
      <Navbar showSearch={true} onSearch={setSearchQuery} />
      <ScrollToTop />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Feed Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        {/* Search and Sort Controls */}
        <div className="mb-2">
          <div className="text-gray-700">
            {searchQuery && (
              <p className="text-sm">
                Results <span className="font-semibold">"{searchQuery}"</span>
              </p>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-between w-full">
            <div className='flex gap-3 text-gray-500'>
              <button
                className={`${tab === 'businesses' ? 'text-gray-800' : 'text-gray-400'}`}
                onClick={() => setTab('businesses')}
              >
                Businesses
              </button>
              <button
                className={`${tab === 'posts' ? 'text-gray-800' : 'text-gray-400'}`}
                onClick={() => setTab('posts')}
              >
                Posts
              </button>
              <button
                className={`${tab === 'users' ? 'text-gray-800' : 'text-gray-400'}`}
                onClick={() => setTab('users')}
              >
                Users
              </button>
            </div>

            <div className='flex items-center space-x-2'>
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <select
                title='sortBy'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'likes' | 'trending')}
                className="px-2 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 not-md:text-xs"
              >
                <option value="newest">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {tab === 'businesses' && (
          (filteredStartups ?? []).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
              {filteredStartups?.map((startup) => (
                <StartupCard key={startup.id} startup={startup} userId={startup.user_id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchQuery ? `No startups found matching "${searchQuery}"` : 'No startups found in this category.'}
              </p>
            </div>
          )
        )}

        {tab === 'users' && (
          (filteredUsers ?? []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUsers?.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                  {user.profile_image ? (
                    <img
                      src={getImageUrl(user.profile_image) || undefined}
                      alt={user.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 rounded-full object-cover text-gray-400" />
                  )}
                  <button onClick={() => navigate(`/profile/${user.id}`)} className="text-left">
                    <p className="font-semibold text-gray-900">{user.full_name}</p>
                    <p className="text-sm text-gray-500">{user.user_roles.join(', ')}</p>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchQuery ? `No users found matching "${searchQuery}"` : 'No users found.'}
              </p>
            </div>
          )
        )}

        {tab === 'posts' && (
          (filteredPosts ?? []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
              {filteredPosts?.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  deletePost={() => handleDeletePost(post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchQuery ? `No posts found matching "${searchQuery}"` : 'No posts found in this category.'}
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}