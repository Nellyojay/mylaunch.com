import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface CommentBoxProps {
  comments: Comment[];
}

export function CommentBox({ comments: initialComments }: CommentBoxProps) {
  const { session } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'You',
        text: newComment,
        timestamp: 'Just now'
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {comment.author[0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!session}
          placeholder={session ? "Add a comment..." : "Log in to comment"}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          title='Submit'
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newComment.trim() && !session}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
