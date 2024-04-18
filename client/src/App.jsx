import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import HomePageLog from './components/pages/HomePageLog';
import CreateA from './components/pages/CreateAccount';
const MainMenu = React.lazy(() => import('./components/pages/MainMenu'));
import ForgotPassword from './components/pages/ForgotPassword';
import ErrorPage from './components/pages/errors/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/pages/ResetPassword';
import EmailValidation from './components/pages/EmailValidation'
import Dashboard from './components/pages/DashboardPage';
import LoaderIn from './components/animations/Loaders';
import ProtectedRoute from './router/ProtectedRoute';
import GeneralProtectedRoute from './router/GeneralProtectedRoute';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoaderIn />}>
        <Routes>
          <Route path="/" element={<HomePageLog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateA />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route element={<GeneralProtectedRoute />}>
            <Route path="/main-menu" element={<MainMenu />} />
            <Route element={<ProtectedRoute isAdminOnly={true} />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/validate-email" element={<EmailValidation />} />
          <Route path="/error" element={<ErrorPage errorMessage="Bad Request - The server could not understand the request due to invalid syntax." />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};
export default App;