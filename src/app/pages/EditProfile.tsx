import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../contexts/authContext';
import { useUserData } from '../contexts/userDataContext';
import supabase from '../supabaseClient';

export function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userData, selectedProfile, setSelectedProfile } = useUserData();

  const profileId = selectedProfile || userData?.user_id || user?.id || null;

  const [fullName, setFullName] = useState(userData?.full_name || '');
  const [userName, setUserName] = useState(userData?.user_name || '');
  const [bio, setBio] = useState(userData?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      setFullName(userData.full_name || '');
      setUserName(userData.user_name || '');
      setBio(userData.bio || '');
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileId) {
      setError('Unable to locate profile to edit.');
      return;
    }

    setLoading(true);
    setError(null);

    // Username uniqueness check
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_name', userName)
      .maybeSingle();

    if (checkError) {
      setLoading(false);
      setError(checkError.message || 'Could not verify username uniqueness.');
      return;
    }

    if (existingUser && existingUser.user_id !== profileId) {
      setLoading(false);
      setError('Username is already taken. Please choose another one.');
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ full_name: fullName, user_name: userName, bio })
      .eq('user_id', profileId);

    setLoading(false);

    if (updateError) {
      setError(updateError.message || 'Could not update profile.');
      return;
    }

    setSelectedProfile(profileId);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4 pt-24">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-5 py-2 border rounded-lg border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
