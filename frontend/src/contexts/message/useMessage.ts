import { useContext } from "react";
import { MessageContext } from "./message";

export function useMessage() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessage deve ser usado dentro de MessageProvider");
  }

  return context;
}
