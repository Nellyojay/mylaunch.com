import { useEffect, useState } from 'react';
import { Bookmark, Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import { formatDate } from '../constants/dateFormat';
import supabase from '../supabaseClient';
import { useUserData } from '../contexts/userDataContext';
import { Modal } from './Modal';
import { getImageUrl } from '../constants/imageHandler';
import type { Post } from '../contexts/StartupProfileContext';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  deletePost: () => void;

}

export function PostCard({ post, deletePost }: PostCardProps) {
  const { session, user } = useAuth();
  const { userData, currentUser } = useUserData();
  const [liked, setLiked] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [savingLike, setSavingLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saves, setSaves] = useState(post.saves || 0);
  const [savingSave, setSavingSave] = useState(false);

  const postOwner = Boolean(currentUser?.id === post.user_id && user?.id == currentUser.auth_id)

  useEffect(() => {
    if (!session || !userData) return;

    const fetchStatus = async () => {
      const { data: likedRow, error: likeErr } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', userData.id)
        .maybeSingle()

      if (!likeErr) {
        setLiked(Boolean(likedRow));
      }

      // Fetch saves row explicitly (separate query to keep state correct)
      const { data: savedRow, error: saveErr } = await supabase
        .from('saves')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', userData.id)
        .maybeSingle();

      if (!saveErr) {
        setSaved(Boolean(savedRow));
      }
    };

    void fetchStatus();
  }, [session, userData, post.id]);

  const handleLike = async () => {
    if (!session) return;
    setSavingLike(true);

    const nextLiked = !liked;
    const nextLikeCount = nextLiked ? likes + 1 : likes - 1;

    setLiked(nextLiked);
    setLikes(nextLikeCount);

    const { error: likeError } = nextLiked
      ? await supabase.from('likes').insert([{ post_id: post.id, user_id: userData?.id }])
      : await supabase
        .from('likes')
        .delete()
        .match({ post_id: post.id, user_id: userData?.id });

    if (likeError) {
      setLiked(liked);
      setLikes(likes);
      setSavingLike(false);
      return;
    }

    setSavingLike(false);
  };

  const handleSave = async () => {
    if (!session) return;
    setSavingSave(true);

    const nextSaved = !saved;
    const nextSaveCount = nextSaved ? saves + 1 : saves - 1;

    setSaved(nextSaved);
    setSaves(nextSaveCount);

    const { error: saveError } = nextSaved
      ? await supabase.from('saves').insert([{ post_id: post.id, user_id: userData?.id }])
      : await supabase
        .from('saves')
        .delete()
        .match({ post_id: post.id, user_id: userData?.id });

    if (saveError) {
      setSaved(saved);
      setSaves(saves);
      setSavingSave(false);
      return;
    }

    setSavingSave(false);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">

      {/* Post Image */}
      <div className="flex justify-center items-center aspect-square bg-gray-200">
        <img
          src={getImageUrl(post.image_url) || '/default-post-image.jpg'}
          alt="Post"
          className="w-auto max-w-100% max-h-96 object-contain"
        />
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between -mt-10">
          <Link
            to={`/startup/${post.startup_id}`}
            className=''
          >
            <img
              src={getImageUrl(post.startups.display_image) || undefined}
              alt=""
              className='w-12 h-12 rounded-full'
            />
            <p
              className='line-clamp-1 text-gray-500'
            >
              {post.startups.name}
            </p>
          </Link>

          {postOwner && (
            <button
              title='Delete Post'
              onClick={() => setIsConfirmOpen(true)}
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          )}
        </div>

        <Modal
          isOpen={isConfirmOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            setIsConfirmOpen(false);
            deletePost();
          }}
          onCancel={() => setIsConfirmOpen(false)}
          confirmClassName='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'
        />

        {/* Caption */}
        <div>
          <p className="text-gray-800 leading-relaxed mb-2">
            {post.content}
          </p>
        </div>

        {/* Timestamp */}
        <div className='flex justify-between items-center'>
          <p className="text-xs text-gray-400 uppercase">{formatDate(post.created_at, false)}</p>

          <div className="flex items-center space-x-4">
            <button
              title='Like'
              onClick={handleLike}
              disabled={!session || savingLike}
              className={`flex items-center space-x-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
            >
              <Heart
                className={`w-6 h-6 text-gray-500 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <p className="font-semibold text-gray-500">{likes.toLocaleString()}</p>
            </button>
            <button
              title='Save'
              onClick={handleSave}
              disabled={!session || savingSave}
              className={`flex items-center space-x-1 transition-colors ${saved ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <Bookmark className={`w-6 h-6 ${saved ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`} />
              <p className="font-semibold text-gray-500">{saves.toLocaleString()}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
