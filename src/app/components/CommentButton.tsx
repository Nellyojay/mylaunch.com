import { MessageCircle } from 'lucide-react';

interface CommentButtonProps {
  count: number;
  onClick?: () => void;
}

export function CommentButton({ count, onClick }: CommentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      <span>{count}</span>
    </button>
  );
}
