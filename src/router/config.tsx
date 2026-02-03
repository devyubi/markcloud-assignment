import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const SearchPage = lazy(() => import('../pages/search/page'));
const FavoritesPage = lazy(() => import('../pages/favorites/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SearchPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;