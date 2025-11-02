// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// src/index.js (top)
import 'bootstrap/dist/css/bootstrap.min.css'; // use prebuilt bootstrap
import './index.css'; // your app styles (do NOT import bootstrap inside your scss)
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import store from './app/store';
import PublicLayout from './features/components/PublicLayout';
import Public from './features/pages/HomePage';
import Login from './features/auth/Login';
import DashLayout from './features/components/DashLayout';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import PartsList from './features/parts/PartsList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import ROLES from './config/roles';
import ErrorPage from './error-page';
import EditPart from './features/parts/EditPart';
import NewPart from './features/parts/NewPart';
import Features from './features/pages/FeaturesPage';
import Plans from './features/pages/PlansPage';
import Pricing from './features/pages/PricingPage';
import ViewPart from './features/parts/ViewPart';
import DashCards from './features/components/DashCards';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

// keep your existing imports (PublicLayout, DashLayout, PersistLogin, RequireAuth, Prefetch, etc.)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC SITE branch (header/footer) */}
      <Route element={<PublicLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Public />} />
        <Route path="features" element={<Features />} />
        <Route path="plans" element={<Plans />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        {/* optional public 404 */}
        <Route path="*" element={<Public />} />
      </Route>

      {/* DASH (protected) branch — completely separate layout */}
      <Route path="dash" element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>
            <Route element={<DashLayout />}>
              <Route index element={<DashCards />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="parts">
                  <Route index element={<PartsList />} />
                  <Route path="new" element={<NewPart />} />
                  <Route path=":id" element={<ViewPart />} />
                  <Route path=":id/edit" element={<EditPart />} />
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path="new" element={<NewNote />} />
                  <Route path=":id" element={<EditNote />} />
                </Route>

                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<NewUserForm />} />
                  <Route path=":id" element={<EditUser />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
