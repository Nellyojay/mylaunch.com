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
import PostFeed from "./pages/PostFeed";
import { FollowingStartups } from "./pages/FollowingStartups";

export const router = createHashRouter([
  {
    path: "/",
    Component: PostFeed,
  },
  {
    path: "/about",
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
    path: "/following",
    Component: FollowingStartups,
  },
  {
    path: "/startup/:id",
    Component: StartupProfile,
  },
  {
    path: "/startup/:id/edit",
    Component: EditStartup,
  },
  {
    path: "/startup/:id/add-post",
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
    path: "/profile/:id",
    Component: UserProfile,
  },
  {
    path: "/profile/:id/edit",
    Component: EditProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);