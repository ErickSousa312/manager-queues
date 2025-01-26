import { createContext } from "react";

export type Password = {
  number: number;
  guiche: number;
};

export type PropsContextControlPass = {
  currentPassword: Password | null;
  calledPasswords: Password[];
  callNextPassword: () => void;
  resetSystem: () => void;
};

export const ContextControlPass = createContext<
  PropsContextControlPass | undefined
>(undefined);
