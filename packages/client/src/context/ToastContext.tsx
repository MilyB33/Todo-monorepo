// Probably i can put this in redux but decided to keep in pure context

import React, { createContext, useReducer } from "react";

interface PropTypes {
  children: React.ReactNode;
}

enum ToastActions {
  SET_MESSAGE = "SET_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
}

type TMessage = "success" | "error" | "warn" | "info";

interface IState {
  message: string;
  type: TMessage;
}

export interface ToastContextType {
  state: IState;
  handleMessage: (message: string, type: TMessage) => void;
}

interface IPayload<E, P> {
  type: E;
  payload: P;
}

interface IWithoutPayload<E> {
  type: E;
}

type AllActions =
  | IPayload<ToastActions.SET_MESSAGE, IState>
  | IWithoutPayload<ToastActions.DELETE_MESSAGE>;

const toastReducer = (state: IState, action: AllActions): IState => {
  switch (action.type) {
    case ToastActions.SET_MESSAGE: {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      };
    }
    case ToastActions.DELETE_MESSAGE: {
      return {
        ...state,
        message: "",
        type: "info",
      };
    }

    default:
      return { ...state };
  }
};

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastContextProvider = ({ children }: PropTypes) => {
  const [state, dispatch] = useReducer(toastReducer, {
    message: "",
    type: "info",
  });

  const handleMessage = (message: string, type: TMessage) => {
    dispatch({
      type: ToastActions.SET_MESSAGE,
      payload: {
        message,
        type,
      },
    });

    setTimeout(() => {
      dispatch({ type: ToastActions.DELETE_MESSAGE });
    }, 3000);
  };

  return <ToastContext.Provider value={{ state, handleMessage }}>{children}</ToastContext.Provider>;
};

export default ToastContextProvider;
