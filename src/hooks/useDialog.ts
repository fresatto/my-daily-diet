import { useState } from "react";

export function useDialog() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return { open, handleOpenChange };
}
