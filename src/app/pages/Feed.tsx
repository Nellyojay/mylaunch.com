import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { CategoryFilter } from '../components/CategoryFilter';
import { StartupCard } from '../components/StartupCard';
import { ArrowUpDown } from 'lucide-react';
import { useStartup } from '../contexts/StartupProfileContext';

export function Feed() {
  const { startupData } = useStartup();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'trending'>('newest');

  // Filter by category
  let filteredStartups = selectedCategory === 'All'
    ? startupData
    : startupData?.filter(startup => startup.cartegory === selectedCategory);

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredStartups = filteredStartups?.filter(
      startup =>
        startup.name.toLowerCase().includes(query) ||
        startup.founder_name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query)
    );
  }

  // Sort startups
  // const sortedStartups = filteredStartups?.sort((a, b) => {
  //   switch (sortBy) {
  //     case 'likes':
  //       return a.likes;
  //     case 'trending':
  //       return a.likes;
  //     case 'newest':
  //     default:
  //       return a.id;
  //   }
  // });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch={true} onSearch={setSearchQuery} />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Feed Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        {/* Search and Sort Controls */}
        <div className="flex items-center mb-2 gap-4">
          <div className="text-gray-700">
            {searchQuery && (
              <p className="text-sm">
                Results <span className="font-semibold">"{searchQuery}"</span>
              </p>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              title='sortBy'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'likes' | 'trending')}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              <option value="newest">Newest First</option>
              <option value="likes">Most Liked</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>

        {(filteredStartups ?? []).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        )}
      </main>
    </div>
  );
}