import React, { useState } from "react";

import { Loader } from "../";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => Promise<void> | void;
}

export function Button({
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
