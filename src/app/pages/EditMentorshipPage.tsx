import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

export default function EditMentorship() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Pre-populated with existing data (in a real app, this would be fetched)
  const [formData, setFormData] = useState({
    topic: "Web Development Mentorship",
    description:
      "Learn modern web development practices, from frontend frameworks to full-stack architecture. Get personalized guidance and insights from years of industry experience.",
    mentorName: "Sarah Johnson",
    mentorTitle: "Senior Full-Stack Developer & Tech Lead",
    location: "San Francisco, CA",
    bio: "Passionate about helping developers grow their skills and advance their careers. Specializing in React, Node.js, and system design with 10+ years of experience building scalable web applications.",
    experience: "10+ years",
    imageUrl:
      "https://images.unsplash.com/photo-1621533463370-837f20c6c889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ4Nzg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update this in a database
    console.log("Updating mentorship:", formData);
    // Navigate back to the mentorship page
    navigate(`/mentorship/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl">Edit Mentorship</h1>
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
            <span>Back to Mentorship</span>
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
                    Topic *
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="e.g., Web Development Mentorship"
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
              </div>
            </div>

            {/* Mentor Information */}
            <div>
              <h2 className="text-xl mb-4">Mentor Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="mentorName"
                      className="block text-sm mb-2 text-gray-700"
                    >
                      Mentor Name *
                    </label>
                    <input
                      type="text"
                      id="mentorName"
                      name="mentorName"
                      required
                      value={formData.mentorName}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

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

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Profile Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
