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
import { EditProfile } from "./pages/EditProfile";
import { Feedback } from "./pages/Feedback";
import TC_agree from "./pages/TC_agree";

export const router = createHashRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/TC_agree",
    Component: TC_agree,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/feedback",
    Component: Feedback,
  },
  {
    path: "/startup/:id",
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
    path: "/profile/edit",
    Component: EditProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);