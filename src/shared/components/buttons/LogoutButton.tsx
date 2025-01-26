import { useAuth } from "@/shared/context/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Logout
    </button>
  );
};
