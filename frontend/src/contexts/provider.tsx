import { MessageProvider, UserProvider } from "./";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <MessageProvider>
      <UserProvider>{children}</UserProvider>
    </MessageProvider>
  );
}
