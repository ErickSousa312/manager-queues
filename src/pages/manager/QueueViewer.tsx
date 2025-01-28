import React, { useEffect, useState } from "react";
import { MainDisplay } from "@/shared/components/MainDisplay";
import { apiAddress } from "@/shared/services/api";

const QueueViewer = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [passwords, setPasswords] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState<any | null>(null);

  useEffect(() => {
    const socket = new WebSocket(apiAddress);
    socket.onopen = () => {
      console.log("Conectado ao servidor WebSocket");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "passwords") {
          setPasswords(data.data);
        } else if (data.type === "broadcast") {
          setPasswords(data.data);
          setCurrentPassword(data.currentPassword);
        }
      } catch (error) {
        console.log("Erro ao processar mensagem:", event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-wrap">
      {/* Metade esquerda da tela: Contador de senha atual */}
      <div className="w-[50%] h-full bg-blue-700 flex items-center justify-center">
        <MainDisplay
          id={currentPassword?.id}
          guiche={currentPassword?.guiche}
        />
      </div>

      {/* Metade direita da tela: Lista de senhas chamadas */}
      <div className="w-[50%] h-full bg-gray-800 flex flex-col items-center justify-start overflow-y-auto">
        <h2 className="text-4xl font-bold mt-8 mb-4">Senhas Chamadas</h2>
        {passwords.length > 0 ? (
          <ul className="space-y-4 w-[94%] max-h-[90%] overflow-y-hidden">
            {passwords.slice(1).map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-blue-600 pl-10 pr-10 rounded-md p-4 shadow-md"
              >
                <span className="text-3xl font-bold">{item.id}</span>
                <span className="text-3xl">{`Guichê ${item.guiche}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-xl text-center mt-20">
            Nenhuma senha foi chamada ainda.
          </p>
        )}
      </div>
    </div>
  );
};

export default QueueViewer;
