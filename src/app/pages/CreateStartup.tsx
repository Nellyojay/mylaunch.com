import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Upload, X } from 'lucide-react';
import { useWebData } from '../contexts/webData';
import supabase from '../supabaseClient';
import { useUserData } from '../contexts/userDataContext';

export function CreateStartup() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { webName } = useWebData();
  const [formData, setFormData] = useState({
    name: '',
    founder: userData?.full_name,
    introDescription: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    category: 'Fashion',
    productOrSevices: ''
  });
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend

    const { error } = await supabase
      .from('startups')
      .insert({
        user_id: userData?.user_id,
        name: formData.name,
        founder_name: formData.founder,
        cartegory: formData.category,
        intro_description: formData.introDescription ?? "Introduction",
        description: formData.description ?? "The full description of the startup",
        phone: formData.phone ?? "",
        email: formData.email ?? "",
        address: formData.address ?? "",
        products_and_services: [formData.productOrSevices ?? ""]
      })
      .select();

    if (error) {
      return;
    } else {
      alert('Startup published successfully!');
      navigate('/feed');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, this would upload files
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuth={false} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Startup</h1>
          <p className="text-gray-600 mb-8">Share your business with the {webName} community</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Startup Business Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your startup name"
              />
            </div>

            {/* Founder Name */}
            <div>
              <label htmlFor="founder" className="block text-sm font-medium text-gray-700 mb-2">
                Founder Name *
              </label>
              <input
                type="text"
                id="founder"
                required
                value={formData.founder}
                onChange={(e) => setFormData({ ...formData, founder: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Fashion">Fashion</option>
                <option value="Tech">Tech</option>
                <option value="Food">Food</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Beauty">Beauty</option>
                <option value="Art">Art</option>
                <option value="Services">Services</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Startup intro description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.introDescription}
                onChange={(e) => setFormData({ ...formData, introDescription: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us about your startup..."
              />
            </div>

            <div>
              <label htmlFor="founder" className="block text-sm font-medium text-gray-700 mb-2">
                Products or Services *
              </label>
              <input
                type="text"
                id="founder"
                required
                value={formData.productOrSevices}
                onChange={(e) => setFormData({ ...formData, productOrSevices: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Service Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        title='button'
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Startup business Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0712345678"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Startup business email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourstartup@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City or State"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/feed')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Publish Startup
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}