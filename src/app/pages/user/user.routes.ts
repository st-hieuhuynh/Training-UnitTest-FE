import { PageRoute } from '@app/core/modules/custom-router-dom/router.interface';
import React from 'react';

const User = React.lazy(() => import('./containers/User'));
const UserList = React.lazy(() => import('./containers/UserList'));
const UserDetail = React.lazy(() => import('./containers/UserDetail'));

const userRoutes: PageRoute[] = [
  {
    path: 'users',
    element: User,
    children: [
      {
        path: '',
        element: UserList,
      },
      {
        path: ':id',
        element: UserDetail,
      },
    ]
  }
];

export default userRoutes;
