import { all } from 'redux-saga/effects';

import { watchAuth } from '@app/core/auth/auth.middleware';
import { watchUser } from './pages/user/user.middleware';

export default function* appMiddleware() {
  yield all([
    watchAuth(),
    watchUser()
  ]);
}
