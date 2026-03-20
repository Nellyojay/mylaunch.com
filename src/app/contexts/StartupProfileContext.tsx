import { createContext, useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

export type StartupData = {
  id: string;
  created_at: string;
  cover_image: string;
  display_image: string;
  address: string;
  address_details: string;
  cartegory: string;
  description: string;
  email: string;
  founder_name: string;
  intro_description: string;
  likes: number;
  opinions: number;
  followers: number;
  name: string;
  phone: string;
  products_and_services: [string];
  user_id: string;
  website: string;
  x_username: string;
}

type StartupContextType = {
  startupData: StartupData[] | null;
  startupLoading: boolean;
};

const StartupContext = createContext<StartupContextType | null>(null);

export const StartupProvider = ({ children }: { children: React.ReactNode }) => {
  const [startupLoading, setStartupLoading] = useState(false);
  const [startupData, setStartupData] = useState<StartupData[] | null>([]);

  const getStartupData = useCallback(async () => {
    setStartupLoading(true)
    const { data, error } = await supabase
      .from("startups")
      .select("*");

    if (error) {
      setStartupLoading(false);
      return;
    } else {
      setStartupData(data);
    }
    setStartupLoading(false);

  }, [])

  useEffect(() => {
    getStartupData();
  }, [getStartupData])

  return (
    <StartupContext.Provider value={{ startupData, startupLoading }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartup = () => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};