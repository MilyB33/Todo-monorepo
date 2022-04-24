import { useRef, useEffect } from "react";
import { Messages } from "primereact/messages";
import { useToastMessage } from "../../hooks/useToastMessage";

const ErrorResponse = () => {
  const { state } = useToastMessage();
  const messages = useRef<Messages>(null);

  const showMessage = () => {
    messages.current!.show({
      severity: state.type,
      detail: state.message,
      closable: false,
      life: 2000,
    });
  };

  useEffect(() => {
    if (state.message) {
      showMessage();
    }
  }, [state]);

  return <Messages ref={messages} className="!fixed right-2 top-2 !z-50" />;
};

export default ErrorResponse;
