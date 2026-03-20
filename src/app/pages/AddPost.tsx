import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../contexts/authContext';
import { useStartup } from '../contexts/StartupProfileContext';
import { useUserData } from '../contexts/userDataContext';
import supabase from '../supabaseClient';

export function AddPost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startupData } = useStartup();
  const { userData, selectedProfile } = useUserData();

  const profileId = selectedProfile || userData?.user_id || user?.id;
  const startup = startupData?.find((s) => s.user_id === profileId) || null;

  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startup) {
      setError('Startup not found for current profile.');
      return;
    }
    if (!content.trim()) {
      setError('Please provide content for the post.');
      return;
    }

    setError(null);
    setSaving(true);

    const { error: insertError } = await supabase.from('startup_posts').insert([
      {
        startup_id: startup.id,
        user_id: userData?.user_id || null,
        content: content.trim(),
        image_url: imagePreview || null,
      },
    ]);

    setSaving(false);

    if (insertError) {
      setError(insertError.message || 'Could not save post');
      return;
    }

    navigate('/startup');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuth={false} />
      <main className="max-w-3xl mx-auto pt-16 pb-12 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add Post</h1>
          <Link className="text-blue-600 hover:text-blue-800" to="/startup">Back to Startup</Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          {!startup ? (
            <p className="text-red-600">No startup selected. Go back to the profile and choose a startup first.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full border rounded-lg p-3 border-gray-300 min-h-45 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your update here..."
                />
              </div>

              <div>
                <label htmlFor="post-image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  id="post-image"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="mt-1 block w-full text-sm text-gray-600"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-full max-h-64 object-cover rounded-lg"
                  />
                )}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
              >
                {saving ? 'Saving...' : 'Publish Post'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
