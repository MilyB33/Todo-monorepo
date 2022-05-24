import { Routes, Route, useLocation } from "react-router-dom";
import Protected from "./Protected";
import Redirect from "./Redirect";

import MainLayout from "../Layouts/MainLayout";
import PageLayout from "../Layouts/PageLayout";

import App from "../../App";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import DashboardPage from "../Pages/DashboardPage";
import CollectionsPage from "../Pages/CollectionsPage";
import CollectionPage from "../Pages/CollectionPage";
import NotFound from "../Pages/NotFound";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<MainLayout />}>
            <Route element={<Redirect />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            <Route element={<Protected />}>
              <Route element={<PageLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:collectionId" element={<CollectionPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
