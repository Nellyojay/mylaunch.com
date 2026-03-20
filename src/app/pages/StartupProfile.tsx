import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { PostCard } from '../components/PostCard';
import { Modal } from '../components/Modal';
import { mockComments } from '../data/mockData';
import supabase from '../supabaseClient';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Heart,
  UserPlus,
  Share2,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Edit,
  Plus,
  Trash2,
  Ellipsis,
  AlertTriangle
} from 'lucide-react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsChevronDown, BsTwitterX } from 'react-icons/bs';
import { useAuth } from '../contexts/authContext';
import { CommentBox } from '../components/CommentBox';
import { useStartup } from '../contexts/StartupProfileContext';
import { formatDate } from '../constants/dateFormat';
import { useUserData } from '../contexts/userDataContext';
import { formatPhoneEA } from '../constants/phoneNumberormater';

export type Post = {
  id: number;
  image_url: string;
  content: string;
  created_at: string;
  likes: number;
  saves: number;
}

export function StartupProfile() {
  const { session, user } = useAuth();
  const { userData, selectedProfile } = useUserData();
  const { startupData } = useStartup();

  const profileId = selectedProfile || userData?.user_id || user?.id;
  const rawStartup = startupData?.find(s => s.user_id === profileId) || null;
  const isOwner = Boolean(rawStartup && userData && user && rawStartup.user_id === userData.user_id && userData.auth_id === user.id);

  const activeStartup = rawStartup;
  const startup = activeStartup;

  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (!activeStartup?.id) {
      setPosts([]);
      setLoadingPosts(false);
      return;
    }

    setLoadingPosts(true);

    let isMounted = true;

    const fetchStartupPosts = async () => {
      const { data, error } = await supabase
        .from('startup_posts')
        .select('id, content, image_url, created_at, likes, saves')
        .eq('startup_id', activeStartup.id)
        .order('created_at', { ascending: false });

      if (isMounted) {
        setLoadingPosts(false);
        if (!error && data) {
          setPosts(data as any[]);
        }
      }
    };

    fetchStartupPosts();

    const postsChannel = supabase
      .channel(`realtime-posts-${activeStartup.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `startup_id=eq.${activeStartup.id}` },
        (payload: any) => {
          setPosts((prevPosts) => {
            const record = payload.new || payload.old;
            if (!record) return prevPosts;

            switch (payload.eventType) {
              case 'INSERT':
                return [record, ...prevPosts];
              case 'UPDATE':
                return prevPosts.map((p) => (p.id === record.id ? record : p));
              case 'DELETE':
                return prevPosts.filter((p) => p.id !== record.id);
              default:
                return prevPosts;
            }
          });
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(postsChannel);
    };
  }, [activeStartup?.id]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: startup?.name,
        text: `Check out ${startup?.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  const handleDeletePost = async (postId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('startup_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      alert("Failed to delete post. Please try again.");
    } else {
      alert("Post deleted successfully.");
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  const handleDeleteStartup = async () => {
    if (!startup || !user || !isOwner) {
      setOpenDeleteModal(false);
      return;
    }

    setOpenDeleteModal(false);

    const { error } = await supabase
      .from('startups')
      .delete()
      .eq('id', startup.id);

    if (error) {
      alert("Failed to delete startup. Please try again.");
    } else {
      alert("Startup deleted successfully.");
      window.location.href = '/feed';
    }
  };
  if (!startupData || !activeStartup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showAuth={false} />
        <div className="pt-24 text-center">
          <h1 className="text-2xl text-gray-900">Startup not found</h1>
          <Link to="/feed" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuth={false} />

      <main className="max-w-4xl mx-auto pt-16 pb-12">
        {/* Banner Image */}
        <div className="relative w-full h-48 md:h-64 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600">
          <img
            src={startup?.cover_image}
            alt={`${startup?.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Header Section */}
        <div className="bg-white -mt-16 mx-4 rounded-3xl shadow-lg p-6 relative z-10">
          {/* Logo overlapping banner */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center shadow-xl -mt-14 border-4 border-white">
              <span className="text-4xl font-bold text-white">{startup?.name[0]}</span>
            </div>

            <div className="flex-1 text-center md:text-left mt-2">

              {/* Startup Name */}
              <h1 className="flex justify-between items-center text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {startup?.name}
                <span>
                  <Ellipsis
                    className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => { }}
                  />
                </span>
              </h1>

              {/* Founder Name */}
              <Link to="/profile" className="text-lg text-gray-600 mb-2 md:hover:text-blue-600">
                Founded by {startup?.founder_name}
              </Link>

              {/* Category and Location */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {startup?.products_and_services ? startup.products_and_services.join(', ') : 'General'}
                </span>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${startup?.phone}`}>+{formatPhoneEA(startup?.phone)}</a>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <a className="text-blue-600 hover:underline">
                    {startup?.website ? startup.website : 'www.startup.com'}
                  </a>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {startup?.intro_description}
              </p>

              <div className='flex gap-6'>
                <p className='text-gray-600'>Followers <strong>{startup?.followers}</strong></p>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className='text-gray-600 md:hover:text-blue-600 transition-colors flex items-center gap-1'
                >
                  Opinions
                  <span><strong>45</strong></span>
                  <BsChevronDown className='w-3 h-3' />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {isOwner ? (
              <>
                <Link
                  to="/startup/edit"
                  className='flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit startup</span>
                </Link>

                <button
                  onClick={() => setOpenDeleteModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all bg-red-600 text-white hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete startup</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setFollowing(!following)}
                disabled={!session}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${following
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                  }`}
              >
                <UserPlus className="w-5 h-5" />
                <span>{following ? 'Following' : 'Follow'}</span>
              </button>
            )}

            <a
              href={`tel:${startup?.phone}`}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </a>

            <button
              onClick={() => setLiked(!liked)}
              disabled={!session}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${liked
                ? 'bg-red-50 text-red-500 border-2 border-red-200'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
              <span>Like</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {showComments ? (
            <CommentBox comments={mockComments} showComments={showComments} setShowComments={setShowComments} />
          ) : (
            <>
              {/* View More Button */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full mt-4 flex items-center justify-center space-x-2 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium"
              >
                <span>{showMore ? 'View Less' : 'View More About Startup'}</span>
                {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {/* Expandable Details Section */}
              {showMore && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Description</h3>
                    <p className="text-gray-700 leading-relaxed">{startup?.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span>{startup?.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <a href={`tel:${startup?.phone}`}>+{formatPhoneEA(startup?.phone)}</a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <a className="text-blue-600 hover:underline">
                            {startup?.website ? startup.website : 'www.startup.com'}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Business Details</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{startup?.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Founded in {formatDate(startup?.created_at, true)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                          <span>Founder: {startup?.founder_name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Social Media</h3>
                    <div className="flex space-x-3">
                      <a
                        title='twitter'
                        href={`https://x.com/${startup?.x_username}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="w-10 h-10 bg-gray-100 text-black rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <BsTwitterX className="w-5 h-5" />
                      </a>
                      <a
                        title='facebook'
                        target='_blank'
                        rel='noopener noreferrer'
                        className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <FaFacebook className="w-6 h-6" />
                      </a>
                      <a
                        title='whatsApp'
                        href={`https://wa.me/${formatPhoneEA(startup?.phone)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                      >
                        <FaWhatsapp className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Posts Feed Section */}
        <div className="mt-8 px-4">
          <div className="mb-6">
            <div className='flex justify-between mb-2 pb-2 border-b border-gray-400'>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Posts</h2>
              {isOwner && (
                <Link to="/startup/add-post" className='flex items-center px-2 gap-2 text-blue-600 md:text-gray-500 md:hover:text-blue-600 border-2 border-blue-600 md:border-gray-400 rounded-lg md:hover:border-blue-600 md:hover:shadow-' >
                  Add Post
                  <Plus />
                </Link>
              )}
            </div>
            <p className="text-gray-600">Latest updates from {startup?.name}</p>
          </div>

          {loadingPosts && (
            <div className="text-center py-8">Loading posts...</div>
          )}

          {!loadingPosts && posts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )}

          {!loadingPosts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  deletePost={() => handleDeletePost(post.id)}
                />
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={openDeleteModal}
          title="Delete startup permanently"
          subTitle="This operation is irreversible. Please proceed with caution."
          message="All startup data, posts, and associated content will be permanently deleted."
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          confirmText="Yes, delete forever"
          cancelText="Keep startup"
          onConfirm={handleDeleteStartup}
          onCancel={() => setOpenDeleteModal(false)}
          confirmClassName="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          cancelClassName="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        />
      </main>
    </div>
  );
}