import React, { useRef } from "react";

import { Button } from "../";

interface ImageButtonProps {
  children?: React.ReactNode;
  id?: string;
  onChange?: (file: File | null) => void;
}

export function ImageButton({
  children,
  id = "file",
  onChange,
}: ImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
    }
  };
  return (
    <span style={{ width: "100%" }}>
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept=".jpeg,.jpg,.png,.webp"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="btn btn-info"
      >
        {children}
      </Button>
    </span>
  );
}
