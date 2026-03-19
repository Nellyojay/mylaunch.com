import { useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';
import type { Post } from '../data/mockData';
import { useAuth } from '../contexts/authContext';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { session } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Post Image */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              title='Like'
              onClick={handleLike}
              disabled={!session}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
            <button
              title='Save'
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors"
              disabled={!session}
            >
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <p className="font-semibold text-gray-900">{likes.toLocaleString()} likes</p>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <p className="text-gray-700 text-sm leading-relaxed">
            {post.caption}
          </p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400 uppercase">{post.timestamp}</p>
      </div>
    </div>
  );
}
