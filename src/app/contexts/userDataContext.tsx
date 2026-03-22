import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

type userData = {
  id: string;
  auth_id: string;
  full_name: string;
  created_at: string;
  user_name: string;
  bio: string;
  start_ups: number;
  followers: number;
  following: number;
  likes: number;
  profile_image: string;
}

type UserDataContextType = {
  userData: userData | null;
  selectedProfile: string | null;
  setSelectedProfile: any;
  loadingUserData: boolean;
  currentUser: userData | null;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<userData | null>(null);
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [selectedProfile, setSelectedProfileState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedProfile');
    }
    return null;
  });
  const [loadingUserData, setLoadingUserData] = useState(false);

  const setSelectedProfile = (id: string | null) => {
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem('selectedProfile', id);
      } else {
        localStorage.removeItem('selectedProfile');
      }
    }
    setSelectedProfileState(id);
  };

  const fetchUserData = async () => {
    if (!selectedProfile) {
      setUserData(null);
      return;
    }

    setLoadingUserData(true);

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', selectedProfile)
      .single();

    if (data) {
      setUserData(data);
    }
    setLoadingUserData(false);
  }

  const fetchCurrentUser = async () => {
    if (!user) {
      setCurrentUser(null);
      return;
    }

    setLoadingUserData(true);

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (data) {
      setCurrentUser(data);
    }
    setLoadingUserData(false);
  }

  useEffect(() => {
    if (selectedProfile && user) {
      fetchUserData();
      fetchCurrentUser();
    } else {
      setUserData(null);
      setCurrentUser(null);
    }
  }, [selectedProfile, user]);

  useEffect(() => {
    if (!selectedProfile) return;

    const channel = supabase
      .channel('public:users')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${selectedProfile}` },
        (payload) => {
          if (payload.new) {
            setUserData(prev => prev && prev.id === payload.new.id ? payload.new as userData : prev);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [selectedProfile, setSelectedProfile, fetchUserData]);

  return (
    <UserDataContext.Provider value={{ userData, loadingUserData, selectedProfile, setSelectedProfile, currentUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
};