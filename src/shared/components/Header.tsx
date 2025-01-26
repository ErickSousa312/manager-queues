import { HomeButton } from "./buttons/HomeButton";
import { LogoutButton } from "./buttons/LogoutButton";

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Sistema de Gerenciamento de Filas
        </h1>
        <div className="flex items-center space-x-4">
          <HomeButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
