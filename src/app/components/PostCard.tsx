import { useEffect, useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import type { Post } from '../pages/StartupProfile';
import { formatDate } from '../constants/dateFormat';
import supabase from '../supabaseClient';
import { useUserData } from '../contexts/userDataContext';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { session } = useAuth();
  const { userData } = useUserData();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [savingLike, setSavingLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saves, setSaves] = useState(post.saves || 0);
  const [savingSave, setSavingSave] = useState(false);

  useEffect(() => {
    if (!session || !userData) return;

    const fetchStatus = async () => {
      const { data: likedRow, error: likeErr } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', userData.user_id)
        .maybeSingle()

      if (!likeErr) {
        setLiked(Boolean(likedRow));
      }

      // Fetch saves row explicitly (separate query to keep state correct)
      const { data: savedRow, error: saveErr } = await supabase
        .from('saves')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', userData.user_id)
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
      ? await supabase.from('likes').insert([{ post_id: post.id, user_id: userData?.user_id }])
      : await supabase
        .from('likes')
        .delete()
        .match({ post_id: post.id, user_id: userData?.user_id });

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
      ? await supabase.from('saves').insert([{ post_id: post.id, user_id: userData?.user_id }])
      : await supabase
        .from('saves')
        .delete()
        .match({ post_id: post.id, user_id: userData?.user_id });

    if (saveError) {
      setSaved(saved);
      setSaves(saves);
      setSavingSave(false);
      return;
    }

    setSavingSave(false);
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
              disabled={!session || savingLike}
              className={`flex items-center space-x-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
            >
              <Heart
                className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <p className="font-semibold text-gray-900">{likes.toLocaleString()}</p>
            </button>
            <button
              title='Save'
              onClick={handleSave}
              disabled={!session || savingSave}
              className={`flex items-center space-x-1 transition-colors ${saved ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'}`}
            >
              <Bookmark className={`w-6 h-6 ${saved ? 'text-blue-500' : ''}`} />
              <p className="font-semibold text-gray-900">{saves.toLocaleString()}</p>
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
