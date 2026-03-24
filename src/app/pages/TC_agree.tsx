import { Link } from "react-router-dom";
import { useUserData } from "../contexts/userDataContext";

export default function TC_agree() {
  const { agreeToTC } = useUserData();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border border-gray-300 p-8 rounded-xl shadow-lg">
        <h1 className="text-lg font-semibold text-gray-800 mb-4 text-center">Terms and conditions</h1>

        <p className="mb-6 text-gray-800">Please agree to the Terms and Conditions.</p>

        <div className="flex justify-center items-center">
          <Link
            to={"/feed"}
            onClick={agreeToTC}
            className="text-white font-semibold border border-gray-300 bg-blue-600 shadow-sm py-2 px-8 rounded-lg"
          >
            Agree
          </Link>
        </div>
      </div>
    </div>
  )
}
