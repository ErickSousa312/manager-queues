import { LogoutButton } from "@/shared/components/buttons/LogoutButton";
import { Header } from "@/shared/components/Header";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => navigate("/filas")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition duration-300 text-xl"
          >
            Gerenciador de Filas
          </button>
          <button
            onClick={() => navigate("/senhas")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition duration-300 text-xl"
          >
            Gerenciador de Senhas
          </button>
          <button
            onClick={() => navigate("/exibir_fila")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-4 rounded-lg shadow-md transition duration-300 text-xl"
          >
            Painel de vizualização de Senhas
          </button>
        </div>
      </main>

      <footer className="bg-white shadow-md p-4 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2023 Sistema de Gerenciamento de Filas. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  );
}
