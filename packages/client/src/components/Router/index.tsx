import { Routes, Route, useLocation } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import PageLayout from "../Layouts/PageLayout";

import App from "../../App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Dashboard from "../Pages/Dashboard";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PageLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
