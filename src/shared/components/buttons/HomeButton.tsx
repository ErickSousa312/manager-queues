import { useAuth } from "@/shared/context/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/dashboard");
      }}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Menu
    </button>
  );
};
