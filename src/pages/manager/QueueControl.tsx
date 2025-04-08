import { Password } from "@/@types/passwords";
import { GuicheCount } from "@/shared/components/GuicheCount";
import { Header } from "@/shared/components/Header";
import { MainDisplay } from "@/shared/components/MainDisplay";
import { QueueDisplay } from "@/shared/components/QueueDisplay";
import { apiAddress } from "@/shared/services/api";
import React, { useEffect, useState, useRef } from "react";

const QueueControl = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [passwords, setPasswords] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState<any | null>(null);

  const count = useRef(0);

  const connectWebSocket = () => {
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
          console.log("broadcast");
          console.log(data);
          setPasswords(data.data);
          setCurrentPassword(data.currentPassword);
        }
      } catch (error) {
        console.log("mensagem:", event.data);
      }
    };

    socket.onerror = (err) => {
      console.error("Erro de WebSocket:", err);
    };

    socket.onclose = () => {
      console.log("Conexão WebSocket fechada, tentando reconectar...");
      reconnect();
    };

    setWs(socket);
  };

  const reconnect = () => {
    setTimeout(() => {
      console.log("Tentando reconectar ao servidor WebSocket...");
      connectWebSocket();
    }, 5000);
  };

  const getcurrentPasswordByGuiche = (guiche: string) => {
    const currentPassword = passwords.find(
      (password) => password.guiche === guiche,
    );
    return currentPassword ? currentPassword.id : null;
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

  const callNextPasswordPriority = (guiche: string) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "callNextPassword",
          guiche,
          priority: true,
        }),
      );
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="h-['100%'] pl-10 pr-10 pt-4 pb-2 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Filas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
          <MainDisplay
            id={currentPassword?.id}
            guiche={currentPassword?.guiche}
          ></MainDisplay>
          <QueueDisplay calledTickets={passwords}></QueueDisplay>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6 ">
          <GuicheCount
            guiche="1"
            callnextGuiche={() => callNextPassword("1")}
            currentPassword={getcurrentPasswordByGuiche("1")}
            callnextGuichePriority={() => callNextPasswordPriority("1")}
          ></GuicheCount>
          <GuicheCount
            guiche="2"
            callnextGuiche={() => callNextPassword("2")}
            currentPassword={getcurrentPasswordByGuiche("2")}
            callnextGuichePriority={() => callNextPasswordPriority("2")}
          ></GuicheCount>
          <GuicheCount
            guiche="3"
            callnextGuiche={() => callNextPassword("3")}
            currentPassword={getcurrentPasswordByGuiche("3")}
            callnextGuichePriority={() => callNextPasswordPriority("3")}
          ></GuicheCount>
          <GuicheCount
            guiche="4"
            callnextGuiche={() => callNextPassword("4")}
            currentPassword={getcurrentPasswordByGuiche("4")}
            callnextGuichePriority={() => callNextPasswordPriority("4")}
          ></GuicheCount>
          <GuicheCount
            guiche="5"
            callnextGuiche={() => callNextPassword("5")}
            currentPassword={getcurrentPasswordByGuiche("5")}
            callnextGuichePriority={() => callNextPasswordPriority("5")}
          ></GuicheCount>
        </div>
      </div>
    </>
  );
};

export default QueueControl;
