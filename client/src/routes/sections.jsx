import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';

// Importaciones directas en lugar de carga perezosa
import IndexPage from '../pages/app';
import BlogPage from '../pages/blog';
import UserPage from '../pages/user';
import LoginPage from '../pages/login';
import ProductsPage from '../pages/products';
import Page404 from '../pages/page-not-found';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        // Más rutas...
      ],
    },
    { path: 'login', element: <LoginPage /> },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}
