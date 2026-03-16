import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "./authContext";

type userData = {
  user_id: string;
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
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userData | null>(null);
  const { user } = useAuth();

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user?.id);

    if (data) {
      setUserData(data[0]);
    }
    if (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [user]);

  return (
    <UserDataContext.Provider value={{ userData }}>
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