import { useState } from "react";

export const useVisibility = () => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  const handleToggle = () => setVisible(!visible);

  return { visible, handleClose, handleOpen, handleToggle };
};
