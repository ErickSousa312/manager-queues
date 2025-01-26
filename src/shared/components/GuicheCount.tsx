import { Password } from "@/@types/passwords";

interface GuicheCountProps {
  guiche: string;
  callnextGuiche: () => void;
  currentPassword: string;
}

export function GuicheCount({
  guiche,
  callnextGuiche,
  currentPassword,
}: GuicheCountProps) {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Guichê {guiche}</h2>
        <p className="text-[18px] font-medium mb-4 text-black">
          Senha atual: {currentPassword || "---"}
        </p>
        <button
          onClick={() => callnextGuiche()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Chamar Próxima
        </button>
      </div>
    </>
  );
}
