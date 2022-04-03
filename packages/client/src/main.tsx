import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { Provider } from "react-redux";
import { store } from "./store/app/store";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "./clients/ApolloClient";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={ApolloClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
