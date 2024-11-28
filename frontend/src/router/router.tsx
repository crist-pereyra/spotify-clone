import App from '@/App';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminPage } from '@/pages/AdminPage';
import { AlbumPage } from '@/pages/AlbumPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { ChatPage } from '@/pages/ChatPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'chat',
            element: <ChatPage />,
          },
          {
            path: 'album/:albumId',
            element: <AlbumPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminPage />,
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
]);
