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
import Layout from "components/layout/PublicLayout";
import Public from "features/pages/Public";
import Login from "features/auth/Login";
import DashLayout from "components/layout/DashLayout";
import NotesList from "components/notes/NotesList";
import UsersList from "components/users/UsersList";
import EditUser from "components/users/EditUser";
import NewUserForm from "components/users/NewUserForm";
import EditNote from "components/notes/EditNote";
import NewNote from "components/notes/NewNote";
import Prefetch from "features/auth/Prefetch";
import PersistLogin from "features/auth/PersistLogin";
import RequireAuth from "features/auth/RequireAuth";
import { ROLES } from "config/roles";
import ErrorPage from "error-page";
import ReactGridLayout from "shared/ui/ReactGridLayout";
import EditPart from "components/parts/EditPart";
import NewPart from "components/parts/NewPart";
import Features from "shared/ui/Features";
import Plans from "shared/ui/Plans";
import Pricing from "shared/ui/Pricing";
import ViewPart from "components/parts/ViewPart";
import "./index.scss";
import PartsListContainer from "features/parts/containers/PartsListContainer";
import { ThemeProvider } from "context/ThemeContext";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Public />} />
      <Route path="features" element={<Features />} />
      <Route path="plans" element={<Plans />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />

      {/* Protected Routes */}
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
                <Route index element={<PartsListContainer />} />
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
                <Route index element={<NotesList />} />
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
