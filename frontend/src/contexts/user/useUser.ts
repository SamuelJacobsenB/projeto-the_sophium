import { useContext } from "react";

import { UserContext } from "./user";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useMessage deve ser usado dentro de MessageProvider");
  }

  return context;
}
