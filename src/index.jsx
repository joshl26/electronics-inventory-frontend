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
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Layout from "layout/Layout";
import Public from "features/pages/Public";
import Login from "features/auth/Login";
import DashLayout from "layout/DashLayout";
import NotesList from "features/notes/NotesList";
import UsersList from "features/users/UsersList";
import PartsList from "features/parts/PartsList";
import EditUser from "features/users/EditUser";
import NewUserForm from "features/users/NewUserForm";
import EditNote from "features/notes/EditNote";
import NewNote from "features/notes/NewNote";
import Prefetch from "features/auth/Prefetch";
import PersistLogin from "features/auth/PersistLogin";
import RequireAuth from "features/auth/RequireAuth";
import { ROLES } from "config/roles";
import ErrorPage from "error-page";
import ReactGridLayout from "shared/ui/ReactGridLayout";
import EditPart from "features/parts/EditPart";
import NewPart from "features/parts/NewPart";
import Features from "shared/ui/Features";
import Plans from "shared/ui/Plans";
import Pricing from "shared/ui/Pricing";
import ViewPart from "features/parts/ViewPart";
import "./index.scss";

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
                <Route index element={<PartsList />} />
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
  <ThemeProvider
    breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    minBreakpoint="xxs"
  >
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
