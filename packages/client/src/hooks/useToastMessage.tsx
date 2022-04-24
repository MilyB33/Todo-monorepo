import { useContext } from "react";
import { ToastContext, ToastContextType } from "../context/ToastContext";

export const useToastMessage = () => {
  const { state, handleMessage } = useContext(ToastContext) as ToastContextType;

  const handleSuccess = (message: string) => handleMessage(message, "success");
  const handleError = (message: string) => handleMessage(message, "error");
  const handleWarning = (message: string) => handleMessage(message, "warn");
  const handleInfo = (message: string) => handleMessage(message, "info");

  return { state, handleSuccess, handleError, handleWarning, handleInfo };
};
