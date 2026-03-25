import { createContext, useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useUserData } from "./userDataContext";


export type Post = {
  id: number;
  image_url: string;
  content: string;
  created_at: string;
  likes: number;
  saves: number;
  user_id: string;
  startup_id: string;
  startups: {
    id: string;
    display_image: string;
    name: string;
  }
}

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
  founded_in: string;
  x_username: string;
}

type StartupContextType = {
  startupData: StartupData[] | null;
  startupLoading: boolean;
  loadingPosts: boolean;
  posts: Post[];
  fetchStartupPosts: () => void;
  handleDeletePost: (postId: number) => void;
  getStartupData: () => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>
};

const StartupContext = createContext<StartupContextType | null>(null);

export const StartupProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useUserData();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
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

  }, [currentUser]);

  const fetchStartupPosts = async () => {
    const { data, error } = await supabase
      .from('startup_posts')
      .select('id, content, image_url, created_at, likes, saves, user_id, startup_id, startups(id, display_image, name)')
      .order('created_at', { ascending: false });

    setLoadingPosts(false);
    if (!error && data) {
      setPosts(data as any[]);
    }
  };

  const handleDeletePost = async (postId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('startup_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      alert("Failed to delete post. Please try again.");
    } else {
      alert("Post deleted successfully.");
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  useEffect(() => {
    getStartupData();

    const channel = supabase
      .channel('realtime-startups')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'startups' },
        (payload) => {
          setStartupData((prevState) => {
            if (!prevState) return prevState;

            const record = payload.new || payload.old;
            if (!record) return prevState;

            switch (payload.eventType) {
              case 'INSERT':
                return [...prevState, record as StartupData];
              case 'UPDATE':
                return prevState.map((item) =>
                  item.id === (record as StartupData).id ? (record as StartupData) : item
                );
              case 'DELETE':
                return prevState.filter((item) => item.id !== (record as StartupData).id);
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
  }, [getStartupData, currentUser]);

  return (
    <StartupContext.Provider value={{ startupData, startupLoading, loadingPosts, posts, getStartupData, setLoadingPosts, setPosts, fetchStartupPosts, handleDeletePost }}>
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