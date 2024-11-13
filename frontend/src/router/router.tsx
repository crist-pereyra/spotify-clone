import App from '@/App';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { HomePage } from '@/pages/HomePage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        // element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'auth-callback',
            element: <AuthCallbackPage />,
          },
          {
            path: 'sso-callback',
            element: (
              <AuthenticateWithRedirectCallback
                signInForceRedirectUrl={'/auth-callback'}
              />
            ),
          },
        ],
      },
    ],
  },
]);
