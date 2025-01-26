import { Password } from "@/@types/passwords";
import { LogoutButton } from "@/shared/components/buttons/LogoutButton";
import { Header } from "@/shared/components/Header";
import { useEffect, useState } from "react";

interface Ticket {
  number: string;
  timestamp: Date;
}

export default function TicketGenerator() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [lastTicketNumber, setLastTicketNumber] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [passwords, setPasswords] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.133:3001");
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
          setPasswords(data.allPasswordGenerated);
        }
      } catch (error) {
        console.log("mensagem:", event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  function callnewTicket() {
    console.log("entrou");
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "generatePassword",
        }),
      );
    }
  }
  function excludePasswords() {
    ws?.send(
      JSON.stringify({
        type: "excludeAllPasswords",
      }),
    );
  }
  function excludeAlldata() {
    ws?.send(
      JSON.stringify({
        type: "excludeAllData",
      }),
    );
  }

  // Função para gerar uma nova senha
  const generateTicket = () => {
    const newNumber = lastTicketNumber + 1;
    const newTicket: Ticket = {
      number: `A${newNumber.toString().padStart(3, "0")}`,
      timestamp: new Date(),
    };
    setTickets([...tickets, newTicket]);
    setLastTicketNumber(newNumber);
  };

  const getTicketByPassssword = (passsword: string) => {
    const ticket = tickets.find((ticket) => ticket.number === passsword);
    if (ticket) {
      return ticket;
    }
    return null;
  };

  // Função para imprimir uma senha específica
  const printTicket = (ticket: Password) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Senha ${ticket.id}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; }
              h1 { 
                font-size: 36px;
                margin: 0 0 10px 0; 
              }
              p {         
                font-size: 18px;
                margin: 0; 
              }
              .ticket {
                  flex: 1 1 calc(30% - 40px); /* Cada item ocupa 50% do espaço */
                  max-width: calc(30% - 40px);
                  border: 1px solid #ccc;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  text-align: left; /* Alinhamento do conteúdo interno */
              }
            </style>
          </head>
          <body >
          <div class="container">
          <div class="ticket">
            <h1>Senha: ${ticket.id}</h1>
          </div>
          </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Função para imprimir todas as senhas
  const printAllTickets = () => {
    const printWindow = window.open("", "senhas");
    if (printWindow) {
      printWindow.document.write(`
<html>
  <head>
    <title>Todas as Senhas</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
      }
      h1 {
        font-size: 48px;
        margin-bottom: 20px;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px; /* Espaço entre os itens */
      }
      .ticket {
        flex: 1 1 calc(25% - 20px); /* Cada item ocupa 50% do espaço */
        max-width: calc(25% - 20px);
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: left; /* Alinhamento do conteúdo interno */
      }
      .ticket h2 {
        font-size: 36px;
        margin: 0 0 10px 0;
      }
      .ticket p {
        font-size: 18px;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <h1>Todas as Senhas</h1>
    <div class="container">
      ${passwords
        .map(
          (ticket) => `
          <div class="ticket">
            <h2> Senha: ${ticket.id}</h2>
          </div>
        `,
        )
        .join("")}
    </div>
  </body>
</html>

      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <Header />
      <div className="h-['100%'] pl-10 pr-10 bg-gray-100 pb-4 pt-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Gerador de Senhas
        </h1>

        {/* Botão para gerar nova senha */}
        <button
          onClick={() => {
            callnewTicket();
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mb-4 shadow"
        >
          Gerar Nova Senha
        </button>

        {/* Botão para imprimir todas as senhas */}
        {passwords.length > 0 && (
          <button
            onClick={printAllTickets}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4 shadow"
          >
            Imprimir Todas as Senhas
          </button>
        )}

        {/* Botão para imprimir todas as senhas */}
        {passwords.length > 0 && (
          <button
            onClick={excludePasswords}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 shadow"
          >
            Excluir Todas as Senhas
          </button>
        )}

        {/* Botão para imprimir todas as senhas */}
        {passwords.length > 0 && (
          <button
            onClick={excludeAlldata}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 shadow"
          >
            Excluir Todos os dados
          </button>
        )}

        {/* Lista de senhas geradas */}
        <div className="bg-white shadow-md rounded-lg p-6 pt-4 mt-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Senhas Geradas Não Usadas
          </h2>
          {passwords.length === 0 ? (
            <p className="text-gray-600">Nenhuma senha gerada ainda.</p>
          ) : (
            <ul className="space-y-3">
              {passwords?.map((ticket, index) => {
                if (!ticket.called) {
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-200 text-gray-800 p-3 rounded shadow"
                    >
                      <span className="text-lg font-sans font-medium">
                        Senha: {ticket.id}
                      </span>
                      <button
                        onClick={() => printTicket(ticket)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm shadow"
                      >
                        Imprimir
                      </button>
                    </li>
                  );
                }

                // Retorne um fallback ou continue com outro conteúdo caso não atenda à condição
                return null;
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
