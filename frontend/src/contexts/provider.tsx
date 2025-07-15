import { MessageProvider } from "./";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <MessageProvider>{children}</MessageProvider>;
}
