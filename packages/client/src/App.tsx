import { Outlet } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/index.css";
import { useInit } from "./hooks/useInit";

function App() {
  useInit();

  return <Outlet />;
}

export default App;
