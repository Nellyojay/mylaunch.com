import { Link } from 'react-router';
import { LikeButton } from './LikeButton';
import { CommentButton } from './CommentButton';

export interface Startup {
  id: number;
  name: string;
  founder: string;
  description: string;
  image: string;
  category: string;
  likes: number;
  comments: number;
  verified: boolean;
}

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
      {/* Startup Image */}
      <Link to={`/startup/${startup.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={startup.image}
            alt={startup.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link to={`/startup/${startup.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {startup.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-gray-600">by {startup.founder}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2">
          {startup.description}
        </p>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <LikeButton initialLikes={startup.likes} />
            <CommentButton count={startup.comments} />
          </div>
          <Link
            to={`/startup/${startup.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Startup
          </Link>
        </div>
      </div>
    </div>
  );
}