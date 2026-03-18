import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { useAuth } from './contexts/authContext';

export default function App() {
  const { session } = useAuth();

  console.log('Current session:', session);
  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      window.history.replaceState({}, document.title, "/")
    }
  }, [])

  return <RouterProvider router={router} />;
}
