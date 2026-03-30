import { Link } from "react-router";
import { BookOpen, Users, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { MentorshipData } from "../contexts/mentorshipContext";

export default function MentorshipPageCard(mentorship: MentorshipData) {

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <Link
        key={mentorship.id}
        to={`/mentorship-page/1`}
      >
        {/* Mentor Image */}
        <div className="aspect-video bg-linear-to-br from-blue-500 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mb-2">
              {mentorship.category}
            </span>
            <h3 className="text-lg group-hover:text-blue-600 transition-colors">
              {mentorship.topic}
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {mentorship.description}
          </p>

          {/* Mentor Info */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <ImageWithFallback
              src={mentorship.mentorImage}
              alt={mentorship.mentorName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">{mentorship.mentorName}</p>
              <p className="text-xs text-gray-500">Mentor</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{mentorship.students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{mentorship.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
