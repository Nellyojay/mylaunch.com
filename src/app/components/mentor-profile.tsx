import { MapPin, Award, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MentorProfileProps {
  name: string;
  title: string;
  location: string;
  imageUrl: string;
  bio: string;
  experience: string;
  students: number;
  rating: number;
}

export function MentorProfile({
  name,
  title,
  location,
  imageUrl,
  bio,
  experience,
  students,
  rating,
}: MentorProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Profile Image */}
        <div className="shrink-0">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="mb-3">
            <h2 className="text-xl md:text-2xl mb-1">{name}</h2>
            <p className="text-blue-600 text-sm md:text-base mb-2">{title}</p>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 text-sm md:text-base">{bio}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Experience</p>
                <p className="text-sm">{experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Students</p>
                <p className="text-sm">{students}+</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-sm">{rating}/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
