import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { store } from "app/store";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import PublicLayout from "components/layout/PublicLayout";
import HomePage from "components/pages/public/HomePage/HomePage";
import FeaturesPage from "components/pages/public/FeaturesPage/FeaturesPage";
import PricingPage from "components/pages/public/PricingPage/PricingPage";
import LoginPage from "components/pages/public/LoginPage/LoginPage";

import DashLayout from "components/layout/DashLayout";

import UsersPage from "components/pages/dashboard/users/UsersPage";
import EditUserPage from "components/pages/dashboard/users/EditUserPage/EditUserPage";
import NewUserPage from "components/pages/dashboard/users/NewUserPage/NewUserPage";

import NotesPage from "components/pages/dashboard/notes/NotesPage";
import EditNotePage from "components/pages/dashboard/notes/EditNotePage/EditNotePage";
import NewNotePage from "components/pages/dashboard/notes/NewNotePage/NewNotePage";

import PartsPage from "components/pages/dashboard/parts/PartsPage";
import EditPartPage from "components/pages/dashboard/parts/EditPartPage/EditPartPage";
import NewPartPage from "components/pages/dashboard/parts/NewPartPage/NewPartPage";
import ViewPartPage from "components/pages/dashboard/parts/ViewPartPage/ViewPartPage";

import ReactGridLayout from "components/common/ReactGridLayout";

import Prefetch from "components/features/auth/Prefetch";
import PersistLogin from "components/features/auth/PersistLogin";
import RequireAuth from "components/features/auth/RequireAuth";
import { ROLES } from "config/roles";
import ErrorPage from "error-page";
import { ThemeProvider } from "context/ThemeContext";
import "./index.scss";
import SignupPage from "components/pages/public/SignupPage/SignupPage";
import ContactPage from "components/pages/public/ContactPage/ContactPage";
import AboutPage from "components/pages/public/AboutPage/AboutPage";
import PrivacyPage from "components/pages/public/PrivacyPage/PrivacyPage";
import TermsPage from "components/pages/public/TermsPage/TermsPage";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      {/* Public Page Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="terms-of-service" element={<TermsPage />} />
      </Route>

      {/* Protected Page Routes */}
      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<Prefetch />}>
            <Route element={<DashLayout />} path="dash">
              {/* Dashboard Home */}
              <Route index element={<ReactGridLayout />} />

              {/* Parts Routes */}
              <Route
                path="parts"
                element={
                  <RequireAuth
                    allowedRoles={[
                      ROLES.Manager,
                      ROLES.Admin,
                      ROLES.Employee,
                      ROLES.DEMO,
                    ]}
                  />
                }
              >
                <Route index element={<PartsPage />} />
                <Route path=":id" element={<ViewPartPage />} />
                <Route path=":id/edit" element={<EditPartPage />} />
                <Route path="new" element={<NewPartPage />} />
              </Route>

              {/* Notes Routes */}
              <Route
                path="notes"
                element={
                  <RequireAuth
                    allowedRoles={[
                      ROLES.Manager,
                      ROLES.Admin,
                      ROLES.Employee,
                      ROLES.DEMO,
                    ]}
                  />
                }
              >
                <Route index element={<NotesPage />} />
                <Route path=":id" element={<EditNotePage />} />
                <Route path="new" element={<NewNotePage />} />
              </Route>

              {/* Users Routes */}
              <Route
                path="users"
                element={
                  <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                }
              >
                <Route index element={<UsersPage />} />
                <Route path=":id" element={<EditUserPage />} />
                <Route path="new" element={<NewUserPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
