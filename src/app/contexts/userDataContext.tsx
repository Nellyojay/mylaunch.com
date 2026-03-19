import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

type userData = {
  user_id: string;
  auth_id: string;
  full_name: string;
  created_at: string;
  user_name: string;
  bio: string;
  start_ups: number;
  followers: number;
  following: number;
  likes: number;
}

type UserDataContextType = {
  userData: userData | null;
  selectedProfile: string | null;
  setSelectedProfile: any;
  loadingUserData: boolean;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userData | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(false);
  const { session } = useAuth();

  const fetchUserData = async () => {
    setLoadingUserData(true);

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', selectedProfile)
      .single();

    if (data) {
      setUserData(data);
    }
    setLoadingUserData(false);
  }

  useEffect(() => {
    if (session && selectedProfile) {
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [session, selectedProfile]);

  return (
    <UserDataContext.Provider value={{ userData, loadingUserData, selectedProfile, setSelectedProfile }}>
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