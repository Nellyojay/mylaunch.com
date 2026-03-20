import { createHashRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Feed } from "./pages/Feed";
import { StartupProfile } from "./pages/StartupProfile";
import { CreateStartup } from "./pages/CreateStartup";
import { UserProfile } from "./pages/UserProfile";
import { AddPost } from "./pages/AddPost";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import { EditStartup } from "./pages/EditStartup";

export const router = createHashRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/startup",
    Component: StartupProfile,
  },
  {
    path: "/startup/edit",
    Component: EditStartup,
  },
  {
    path: "/startup/add-post",
    Component: AddPost,
  },
  {
    path: "/create",
    Component: CreateStartup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/profile",
    Component: UserProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);