import { Link } from "react-router-dom";
import { BUSINESS_PERSONNEL_ROLE, MENTOR_ROLE, type userData } from "../contexts/userDataContext";

export const ActionsPopup = (user: userData) => {

  return (
    <div
      className="absolute top-10 right-0 flex flex-col bg-white rounded-md border-2 border-gray-300 shadow-lg p-2 w-52 z-10 font-semibold "
    >
      {user.user_roles?.includes(BUSINESS_PERSONNEL_ROLE) && (
        <Link
          to="/create"
          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Create Business Page
        </Link>
      )}
      {user.user_roles?.includes(MENTOR_ROLE) && (
        <Link
          to="/mentorship-page/create"
          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Create Mentorship Page
        </Link>
      )}
    </div>
  );
}