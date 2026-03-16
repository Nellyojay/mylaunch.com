import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const WebDataContext = createContext({
  webName: '',
  webNameError: '',
});

export const WebDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [webName, setWebName] = useState<string>('');
  const [webNameError, setWebNameError] = useState<string>('');

  const fetchWebName = async () => {
    // Fetch web name from your backend or database
    // For example, using supabase:
    const { data, error } = await supabase
      .from('changes')
      .select('web_name')
      .single();

    if (error) {
      setWebNameError('Web name error');
    } else {
      setWebName(data.web_name);
    }
  }

  useEffect(() => {
    fetchWebName();
  }, []);

  return (
    <WebDataContext.Provider value={{ webName, webNameError }}>
      {children}
    </WebDataContext.Provider>
  );
}

export const useWebData = () => {
  return useContext(WebDataContext);
};
