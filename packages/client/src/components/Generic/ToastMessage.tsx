import { useRef, useState, useEffect } from "react";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";

interface IPropTypes {
  message?: string;
  type: "success" | "error" | "warn" | "info";
}

const ErrorResponse = ({ message, type }: IPropTypes) => {
  const messages = useRef<Messages>(null);

  const showError = () => {
    messages.current!.show({
      severity: type,
      detail: message,
      closable: false,
      life: 2000,
    });
  };

  useEffect(() => {
    if (message) {
      showError();
    }
  }, [message]);

  return <Messages ref={messages} className="!fixed right-2 top-2 !z-50" />;
};

export default ErrorResponse;
