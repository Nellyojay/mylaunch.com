import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

interface LikeButtonProps {
  initialLikes: number;
  initialLiked?: boolean;
}

export function LikeButton({ initialLikes, initialLiked = false }: LikeButtonProps) {
  const { session } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

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
    <button
      onClick={handleLike}
      disabled={!session}
      className="flex items-center space-x-2 text-gray-700 md:hover:text-red-500 transition-colors"
    >
      <Heart
        className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`}
      />
      <span>{likes}</span>
    </button>
  );
}
