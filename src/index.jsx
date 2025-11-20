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
import PartsPage from "components/pages/dashboard/parts/PartsPage";
import NotesPage from "components/pages/dashboard/notes/NotesPage";
import UsersList from "components/features/users/UsersList";
import EditUser from "components/pages/dashboard/EditUserPage/EditUserPage";
import NewUserForm from "components/features/users/NewUserForm";
import EditNote from "components/pages/dashboard/notes/EditNotePage/EditNotePage";
import NewNote from "components/pages/dashboard/notes/NewNotePage/NewNotePage";
import EditPart from "components/pages/dashboard/parts/EditPartPage/EditPartPage";
import NewPart from "components/pages/dashboard/parts/NewPartPage/NewPartPage";
import ViewPart from "components/features/parts/ViewPart";
import ReactGridLayout from "components/common/ReactGridLayout";

import Prefetch from "components/features/auth/Prefetch";
import PersistLogin from "components/features/auth/PersistLogin";
import RequireAuth from "components/features/auth/RequireAuth";
import { ROLES } from "config/roles";
import ErrorPage from "error-page";
import { ThemeProvider } from "context/ThemeContext";
import "./index.scss";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      {/* Public Page Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
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
                <Route path=":id" element={<ViewPart />} />
                <Route path=":id/edit" element={<EditPart />} />
                <Route path="new" element={<NewPart />} />
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
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>

              {/* Users Routes */}
              <Route
                path="users"
                element={
                  <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                }
              >
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
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
