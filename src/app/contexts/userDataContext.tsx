import { createContext, useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

type userData = {
  id: string;
  auth_id: string;
  full_name: string;
  created_at: string;
  user_name: string;
  bio: string;
  following: number;
  profile_image: string;
  TC_agreed: boolean;
}

type UserDataContextType = {
  userData: userData | null;
  selectedProfile: string | null;
  setSelectedProfile: any;
  loadingUserData: boolean;
  currentUser: userData | null;
  agreeToTC: () => void;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userData | null>(null);
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [selectedProfile, setSelectedProfileState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedProfile');
    }
    return null;
  });
  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user

        if (!user) return;

        fetchCurrentUser(user.id)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const agreeToTC = async () => {
    if (!currentUser?.id) return;
    console.log(currentUser.id)

    const { error } = await supabase
      .from('users')
      .update({ TC_agreed: true })
      .eq('id', currentUser?.id)
      .select('TC_agreed')
      .single();

    if (error) {
      return;
    }
  }

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

  const fetchUserData = useCallback(async () => {
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
  }, [selectedProfile])

  const fetchCurrentUser = async (userId: string) => {
    setLoadingUserData(true);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', userId)
      .single();

    if (data) {
      setCurrentUser(data);
    } else if (error) {
    }
    setLoadingUserData(false);
  }

  useEffect(() => {
    if (selectedProfile) {
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [selectedProfile]);

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
    <UserDataContext.Provider value={{ userData, loadingUserData, selectedProfile, setSelectedProfile, currentUser, agreeToTC }}>
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