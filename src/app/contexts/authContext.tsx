import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

type User = {
  id: string;
  email: string;
  full_name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: null | User;
  session: null | any;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [session, setSession] = useState<null | any>(null);

  const getSession = async () => {
    const session = await supabase.auth.getSession();
    setIsAuthenticated(!!session.data.session);
    setUser(session.data.session?.user ? {
      id: session.data.session.user.id,
      email: session.data.session.user.email || '',
      full_name: session.data.session.user.user_metadata.full_name || '',
    } : null);
    setSession(session.data.session || null);
  }

  useEffect(() => {
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};