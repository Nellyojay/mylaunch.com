import { useNavigate } from "react-router";
import { useUserData } from "../contexts/userDataContext";

export default function TC_agree() {
  const { agreeToTC, currentUser } = useUserData();
  const navigate = useNavigate();

  const handleAgree = async () => {
    const isAgreed = await agreeToTC();

    if (isAgreed || currentUser?.TC_agreed) {
      // reload userdata context and page
      navigate('/');
      window.location.reload();
      return;
    }

    // If for some reason the DB didn't update, try a soft reload to re-fetch
    window.location.reload();
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border border-gray-300 p-8 rounded-xl shadow-lg">
        <h1 className="text-lg font-semibold text-gray-800 mb-4 text-center">Terms and conditions</h1>

        <p className="mb-6 text-gray-800">Please agree to the Terms and Conditions.</p>

        <div className="flex justify-center items-center">
          <button
            onClick={handleAgree}
            className="text-white font-semibold border border-gray-300 bg-blue-600 shadow-sm py-2 px-8 rounded-lg"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  )
}
