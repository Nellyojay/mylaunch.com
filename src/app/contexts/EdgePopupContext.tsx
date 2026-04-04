import { createContext, useContext, useState } from "react";

type PopupType = "error" | "success" | "info";

interface PopupState {
  message: string;
  type: PopupType;
  visible: boolean;
}

const PopupContext = createContext<any>(null);

export const PopupProvider = ({ children }: any) => {
  const [popup, setPopup] = useState<PopupState>({
    message: "",
    type: "info",
    visible: false,
  });

  const showPopup = (message: string, type: PopupType = "info") => {
    setPopup({ message, type, visible: true });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <PopupContext.Provider value={{ popup, showPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);