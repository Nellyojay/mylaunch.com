import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, X } from "lucide-react";
import ScrollToTop from "../constants/scrollToTop";
import SuccessMessage from "../components/SuccessMessage";
import supabase from "../supabaseClient";
import { useUserData } from "../contexts/userDataContext";

export default function CreateMentorship() {
  const navigate = useNavigate();
  const { currentUser } = useUserData();
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    description: "",
    mentorTitle: "",
    location: "",
    bio: "",
    experience: "",
    imageUrl: "",
  });

  const dismissSelectedImage = () => setFormData({ ...formData, imageUrl: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) setErrorMessage("Please fill in all the necessary fields.");

    const { data, error } = await supabase
      .from('mentorship_page')
      .insert({
        user_id: currentUser?.id,
        category: formData.category,
        description: formData.description,
        topic: formData.topic,
        mentor_title: formData.mentorTitle,
        experience: formData.experience
      })
      .select()

    if (error) {
      console.error(error.message)
    } else {
      setSubmitted(true)
      setFormData({
        topic: "",
        category: "",
        description: "",
        mentorTitle: "",
        location: "",
        bio: "",
        experience: "",
        imageUrl: "",
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 4000);
      console.log(data)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />

      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl">Create New Mentorship</h1>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8"
        >
          <div className="space-y-6">
            {/* Topic Section */}
            <div>
              <h2 className="text-xl mb-4">Mentorship Details</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Sector of Discussion *
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="e.g., Marketing in Agriculture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Brief description of what students will learn..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Category *
                  </label>
                  <input
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Agriculture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Mentor Information */}
            <div>
              <h2 className="text-xl mb-4">Mentor Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="mentorTitle"
                      className="block text-sm mb-2 text-gray-700"
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      id="mentorTitle"
                      name="mentorTitle"
                      required
                      value={formData.mentorTitle}
                      onChange={handleChange}
                      placeholder="e.g., Senior Full-Stack Developer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm mb-2 text-gray-700"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State/Country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm mb-2 text-gray-700"
                    >
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 10+ years"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Bio *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    required
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell students about your background, expertise, and what you're passionate about..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mentorship Display image
                  {formData.imageUrl ? (
                    <div className="w-full flex items-start gap-1">
                      <img
                        src={formData.imageUrl ? formData.imageUrl : '/default-startup-display.jpg'}
                        alt="Cover"
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <button
                        className='justify-end bg-blue-100 rounded-full border-none cursor-pointer'
                        onClick={dismissSelectedImage}
                      >
                        <X className=" text-red-500 font-bold text-3xl hover:text-red-300" />
                      </button>
                    </div>
                  ) : (

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        id="images"
                        name="imageUrl"
                        multiple
                        accept="image/*"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <label htmlFor="images" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload images</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {errorMessage && (
            <p>{errorMessage}</p>
          )}

          {/* Action Buttons */}
          {submitted ? (
            <SuccessMessage
              header="Created Successfully"
              message="Thank you for choosing to share your experience and knowledge"
              error={false}
            />
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Create Mentorship</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
