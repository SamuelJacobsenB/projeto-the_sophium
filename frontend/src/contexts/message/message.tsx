import { createContext, useState } from "react";

import type { MessageType } from "../../types";

interface MessageContextType {
  message: string | null;
  type: MessageType | null;
  showMessage: (message: string, type: MessageType) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: React.ReactNode;
}

function MessageProvider({ children }: MessageProviderProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType | null>(null);

  const showMessage = (message: string, type: MessageType) => {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 6000);
  };

  const clearMessage = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <MessageContext.Provider
      value={{ message, type, showMessage, clearMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContext, MessageProvider };
