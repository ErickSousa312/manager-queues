import React, { useEffect, useState, useRef } from "react";
import { MainDisplay } from "@/shared/components/MainDisplay";
import { apiAddress } from "@/shared/services/api";
import som from '@/assets/som.mp3';

const QueueViewer = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [passwords, setPasswords] = useState<any[]>([]);
  const [currentPassword, setCurrentPassword] = useState<any | null>(null);
  const audioRef = useRef(new Audio(som));
  const [logs, setLogs] = useState<string[]>([]);  // Estado para armazenar logs

  const logContainerRef = useRef<HTMLDivElement | null>(null); // Ref para o painel de logs

  let count = 0;

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
          console.log("Received broadcast:", data);
          if (data.data.length > count) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }

          count = data.data.length;
          setPasswords(data.data);
          setCurrentPassword(data.currentPassword);
        }
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
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

  // Sobrescrevendo os métodos do console
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // Função para atualizar o estado com novos logs
    const captureLogs = (method: string, ...args: any[]) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        `${method.toUpperCase()}: ${args.join(" ")}`,
      ]);
    };

    // Sobrescrevendo os métodos do console
    console.log = (...args: any[]) => {
      captureLogs("log", ...args);
      originalLog.apply(console, args);  // Mantém o comportamento padrão
    };

    console.error = (...args: any[]) => {
      captureLogs("error", ...args);
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      captureLogs("warn", ...args);
      originalWarn.apply(console, args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Função para rolar o painel de logs até o final sempre que a lista de logs for atualizada
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]); // Sempre que os logs mudarem, vai rolar para o final

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-wrap">
      {/* Metade esquerda da tela: Contador de senha atual */}
      <div className="w-[50%] h-full bg-blue-700 flex items-center justify-center">
        <MainDisplay id={currentPassword?.id} guiche={currentPassword?.guiche} />
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

      {/* Painel de Log - Exibindo as mensagens de log
      <div
        ref={logContainerRef}  // Ref para o painel de logs
        className="absolute top-4 left-4 bg-gray-800 p-4 rounded-md w-72 h-40 overflow-y-auto overflow-x-hidden"
      >
        <h3 className="text-xl text-white mb-2">Logs</h3>
        <div className="text-sm text-gray-400">
          <ul className="space-y-2">
            {logs.slice(-5).map((log, index) => (  // Exibe os últimos 5 logs
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default QueueViewer;
