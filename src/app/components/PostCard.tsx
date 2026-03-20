import { useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import type { Post } from '../pages/StartupProfile';
import { formatDate } from '../constants/dateFormat';

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
          src={post.image_url}
          alt="Post"
          className="w-full h-full object-contain"
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
              <p className="font-semibold text-gray-900">{likes.toLocaleString()}</p>
            </button>
            <button
              title='Save'
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors"
              disabled={!session}
            >
              <Bookmark className="w-6 h-6" />
              <p className="font-semibold text-gray-900">{post.saves.toLocaleString()}</p>
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <p className="text-gray-700 text-sm leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400 uppercase">{formatDate(post.created_at, false)}</p>
      </div>
    </div>
  );
}
