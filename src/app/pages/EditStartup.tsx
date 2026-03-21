import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/authContext';
import { useStartup } from '../contexts/StartupProfileContext';
import { useUserData } from '../contexts/userDataContext';

export function EditStartup() {
  const navigate = useNavigate();
  const { session, user } = useAuth();
  const { userData, selectedProfile } = useUserData();
  const { startupData } = useStartup();

  const profileId = selectedProfile || userData?.user_id || user?.id;
  const startup = startupData?.find((s) => s.user_id === profileId) || null;

  const [formData, setFormData] = useState({
    name: '',
    founder_name: '',
    cartegory: '',
    intro_description: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    founded_in: '',
    website: '',
    x_username: '',
    products_and_services: '' // comma-separated input for UI
  });

  useEffect(() => {
    if (startup) {
      setFormData({
        name: startup.name || '',
        founder_name: startup.founder_name || '',
        cartegory: startup.cartegory || '',
        intro_description: startup.intro_description || '',
        description: startup.description || '',
        phone: startup.phone || '',
        email: startup.email || '',
        address: startup.address || '',
        founded_in: startup.founded_in || '',
        website: startup.website || '',
        x_username: startup.x_username || '',
        products_and_services: Array.isArray(startup.products_and_services)
          ? startup.products_and_services.join(', ')
          : ''
      });
    }
  }, [startup]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!startup || !session) {
      alert('Unable to update startup: no startup selected or not authenticated');
      return;
    }

    const productsAndServices = formData.products_and_services
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    console.log(productsAndServices);

    const { error } = await supabase
      .from('startups')
      .update({
        name: formData.name,
        founder_name: formData.founder_name,
        cartegory: formData.cartegory,
        intro_description: formData.intro_description,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        founded_in: formData.founded_in,
        website: formData.website,
        x_username: formData.x_username,
        products_and_services: productsAndServices
      })
      .eq('id', startup.id);

    if (error) {
      console.error('Failed to update startup', error);
      alert('Error updating startup. Please try again.');
    } else {
      alert('Startup updated successfully');
      navigate('/startup');
    }
  };

  if (!startup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="text-2xl text-gray-900">No startup selected</h1>
          <p className="text-gray-600">Please select a startup first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-24 pb-12">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Edit Startup</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Startup Name</span>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Founder Name</span>
                <input
                  value={formData.founder_name}
                  onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Category</span>
              <input
                value={formData.cartegory}
                onChange={(e) => setFormData({ ...formData, cartegory: e.target.value })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Intro Description</span>
              <textarea
                value={formData.intro_description}
                onChange={(e) => setFormData({ ...formData, intro_description: e.target.value })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Full Description</span>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Products & Services (comma-separated)</span>
              <textarea
                value={formData.products_and_services}
                onChange={(e) => setFormData({ ...formData, products_and_services: e.target.value })}
                placeholder="e.g. Product 1, Product 2, Service 1"
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Phone</span>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Founded In</span>
              <input
                value={formData.founded_in}
                onChange={(e) => setFormData({ ...formData, founded_in: e.target.value })}
                placeholder='e.g. 2020'
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Address</span>
              <input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder='e.g. 123 Main St, City, State'
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Website</span>
                <input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder='e.g. www.example.com'
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">X Username</span>
                <input
                  value={formData.x_username}
                  onChange={(e) => setFormData({ ...formData, x_username: e.target.value })}
                  placeholder='e.g. x_example'
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/startup')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!session || !formData.name || !formData.founder_name}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Startup
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
