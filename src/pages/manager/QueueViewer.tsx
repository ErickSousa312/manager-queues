import { Password } from "@/@types/passwords";
import { GuicheCount } from "@/shared/components/GuicheCount";
import { Header } from "@/shared/components/Header";
import { MainDisplay } from "@/shared/components/MainDisplay";
import { QueueDisplay } from "@/shared/components/QueueDisplay";
import { apiAddress } from "@/shared/services/api";
import React, { useEffect, useState } from "react";

const QueueViewer = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [passwords, setPasswords] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState<any | null>(null);

  useEffect(() => {
    const socket = new WebSocket(apiAddress);
    socket.onopen = () => {
      console.log("Conectado ao servidor WebSocket 2");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "passwords") {
          setPasswords(data.data);
        } else if (data.type === "broadcast") {
          console.log("broadcast");
          console.log(data);
          setPasswords(data.data);
          setCurrentPassword(data.currentPassword);
        }
      } catch (error) {
        console.log("mensagem:", event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const getcurrentPasswordByGuiche = (guiche: string) => {
    const currentPassword = passwords.find(
      (password) => password.guiche === guiche,
    );
    if (currentPassword) {
      return currentPassword.id;
    }
    return null;
  };

  const callNextPassword = (guiche: string) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "callNextPassword",
          guiche,
        }),
      );
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-around overflow-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Gerenciamento de Filas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[97%] max-w-[1920px]">
          {/* Display Principal */}
          <MainDisplay
            id={currentPassword?.id}
            guiche={currentPassword?.guiche}
          ></MainDisplay>

          {/* Lista de Senhas Chamadas */}
          <div className="bg-gray-800 shadow-lg rounded-lg pl-6 pr-6 pt-4 pb-4 max-h-[80vh] overflow-y-hidden">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Senhas Chamadas
            </h2>
            {passwords.length > 0 ? (
              <ul className="space-y-4">
                {passwords.slice(1).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-blue-600 rounded-md p-4 shadow-md"
                  >
                    <span className="text-3xl font-bold">{item.id}</span>
                    <span className="text-3xl">{`Guichê ${item.guiche}`}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-xl text-center">
                Nenhuma senha foi chamada ainda.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QueueViewer;
