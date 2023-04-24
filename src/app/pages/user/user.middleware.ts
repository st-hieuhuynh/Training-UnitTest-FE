/* eslint-disable func-style */
import { takeLatest, put } from 'redux-saga/effects';
import ACTION_TYPES from '@app/core/constants/types';
import { AnyAction } from 'redux';
import { getUserListSuccess, getUserListError, getUserDetailSuccess, getUserDetailError } from './user.actions';
import { ApiService } from '@app/core/services/api.service';

const http = new ApiService();
function* getUserList() {
  try {
    const res = yield http.get(['/users']);
    yield put(getUserListSuccess(res));
  } catch (error) {
    yield put(getUserListError(error));
  }
}
function* getUserDetail({ payload }: AnyAction) {
  try {
    const res = yield http.get([`/users/${payload}`]);
    yield put(getUserDetailSuccess(res));
  } catch (error) {
    yield put(getUserDetailError(error));
  }
}

export function* watchUser() {
  yield takeLatest(ACTION_TYPES.GET_USER_LIST, getUserList);
  yield takeLatest(ACTION_TYPES.GET_USER_DETAIL, getUserDetail);
}
