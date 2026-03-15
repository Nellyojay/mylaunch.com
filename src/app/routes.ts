import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Feed } from "./pages/Feed";
import { StartupProfile } from "./pages/StartupProfile";
import { CreateStartup } from "./pages/CreateStartup";
import { UserProfile } from "./pages/UserProfile";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/startup/:id",
    Component: StartupProfile,
  },
  {
    path: "/create",
    Component: CreateStartup,
  },
  {
    path: "/profile/:id",
    Component: UserProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);