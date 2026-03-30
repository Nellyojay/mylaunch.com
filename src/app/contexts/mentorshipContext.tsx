import React, { createContext, useContext, useEffect, useState } from "react";

export type MentorshipData = {
  id: string;
  topic: string;
  category: string;
  mentorName: string;
  mentorImage: string;
  students: number;
  rating: number;
  description: string;
}

const mentorshipPages: MentorshipData[] = [
  {
    id: "1",
    topic: "Web Development Mentorship",
    category: "Technology",
    mentorName: "Sarah Johnson",
    mentorImage:
      "https://images.unsplash.com/photo-1621533463370-837f20c6c889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ4Nzg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    students: 150,
    rating: 4.9,
    description:
      "Learn modern web development with React, Node.js, and full-stack architecture.",
  },
  {
    id: "2",
    topic: "Mobile App Development",
    category: "Technology",
    mentorName: "Michael Chen",
    mentorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0ODc5MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    students: 98,
    rating: 4.8,
    description:
      "Build iOS and Android apps using React Native and Flutter frameworks.",
  },
  {
    id: "3",
    topic: "UI/UX Design Fundamentals",
    category: "Design",
    mentorName: "Emily Rodriguez",
    mentorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ4NzkwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    students: 210,
    rating: 5.0,
    description:
      "Master user interface design and create exceptional user experiences.",
  },
  {
    id: "4",
    topic: "UI/UX Design Fundamentals",
    category: "Design",
    mentorName: "Emily Rodriguez",
    mentorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ4NzkwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    students: 210,
    rating: 5.0,
    description:
      "Master user interface design and create exceptional user experiences.",
  },
];

const MentorshipContext = createContext({
  mentorshipData: [] as MentorshipData[],
});

export const MentorshipDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [mentorshipData, setMentorshipData] = useState<MentorshipData[]>([]);

  useEffect(() => {
    // Simulate fetching mentorship data from an API
    setMentorshipData(mentorshipPages);
  }, []);

  return (
    <MentorshipContext.Provider value={{ mentorshipData }}>
      {children}
    </MentorshipContext.Provider>
  );
}

export const useMentorshipData = () => {
  return useContext(MentorshipContext);
};
