import { useState } from "react";
import { ContextControlPass, Password } from "./ControlPassContext";

export const PasswordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPassword, setCurrentPassword] = useState<Password | null>(null);
  const [calledPasswords, setCalledPasswords] = useState<Password[]>([]);
  const [counter, setCounter] = useState(1); // Contador para as senhas geradas
  const [guiche, setGuiche] = useState(1); // Guichê inicial

  // Função para chamar a próxima senha
  const callNextPassword = () => {
    const nextPassword = { number: counter, guiche };
    setCalledPasswords([...calledPasswords, nextPassword]);
    setCurrentPassword(nextPassword);

    // Atualiza o contador e alterna o guichê
    setCounter(counter + 1);
    setGuiche(guiche === 3 ? 1 : guiche + 1);
  };

  // Função para resetar o sistema
  const resetSystem = () => {
    setCurrentPassword(null);
    setCalledPasswords([]);
    setCounter(1);
    setGuiche(1);
  };

  return (
    <ContextControlPass.Provider
      value={{
        currentPassword,
        calledPasswords,
        callNextPassword,
        resetSystem,
      }}
    >
      {children}
    </ContextControlPass.Provider>
  );
};
