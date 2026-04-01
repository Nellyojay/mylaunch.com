import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useUserData } from "./userDataContext";

export type MentorshipData = {
  id: string;
  created_at: string;
  topic: string;
  category: string;
  mentor_title: string;
  students: number;
  rating: number;
  description: string;
  experience: string;
  image_url: string | null;
  location: string;
  mentorship_bio: string;
  users: {
    id: string;
    full_name: string;
    profile_image: string;
  }
}

type MentorshipContextType = {
  mentorshipData: MentorshipData[] | null;
}

const MentorshipContext = createContext<MentorshipContextType | null>(null);

export const MentorshipDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useUserData();
  const [mentorshipData, setMentorshipData] = useState<MentorshipData[] | null>([]);

  const fetchMentorshipPageData = async () => {
    const { data, error } = await supabase
      .from('mentorship_page')
      .select(`*, users(id, full_name, profile_image)`)

    if (error) {
      return;
    } else {
      setMentorshipData(data)
    }
  }

  useEffect(() => {
    fetchMentorshipPageData();

    const channel = supabase
      .channel('realtime-startups')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'startups' },
        (payload) => {
          setMentorshipData((prevState) => {
            if (!prevState) return prevState;

            const record = payload.new || payload.old;
            if (!record) return prevState;

            switch (payload.eventType) {
              case 'INSERT':
                return [...prevState, record as MentorshipData];
              case 'UPDATE':
                return prevState.map((item) =>
                  item.id === (record as MentorshipData).id ? (record as MentorshipData) : item
                );
              case 'DELETE':
                return prevState.filter((item) => item.id !== (record as MentorshipData).id);
              default:
                return prevState;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  return (
    <MentorshipContext.Provider value={{ mentorshipData }}>
      {children}
    </MentorshipContext.Provider>
  );
}

export const useMentorshipData = () => {
  const context = useContext(MentorshipContext);
  if (!context) {
    throw new Error("useMentorshipdata must be used within an AuthProvider");
  }
  return context;
};
