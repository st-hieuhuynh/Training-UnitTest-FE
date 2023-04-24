import { createReducer } from '@app/core/helpers/reducer-factory';
import ACTION_TYPES from '@core/constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
};

const getUserList = (state) => ({
  ...state,
  isLoading: true
});

const getUserListSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  data: payload
});

const getUserListError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload
});

const clearGetUserList = (state) => ({
  ...state,
  ...initialState
});

const getUserDetail = (state) => ({
  ...state,
  isLoading: true
});

const getUserDetailSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  data: payload
});

const getUserDetailError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload
});

const clearGetUserDetail = (state) => ({
  ...state,
  ...initialState
});

const userListStrategies = {
  [ACTION_TYPES.GET_USER_LIST]: getUserList,
  [ACTION_TYPES.GET_USER_LIST_SUCCESS]: getUserListSuccess,
  [ACTION_TYPES.GET_USER_LIST_ERROR]: getUserListError,
  [ACTION_TYPES.CLEAR_GET_USER_LIST]: clearGetUserList,
  __default__: state => state
};

const userDetailStrategies = {
  [ACTION_TYPES.GET_USER_DETAIL]: getUserDetail,
  [ACTION_TYPES.GET_USER_DETAIL_SUCCESS]: getUserDetailSuccess,
  [ACTION_TYPES.GET_USER_DETAIL_ERROR]: getUserDetailError,
  [ACTION_TYPES.CLEAR_GET_USER_DETAIL]: clearGetUserDetail,
  __default__: state => state
};

export const userListReducer = createReducer(userListStrategies, initialState);
export const userDetailReducer = createReducer(userDetailStrategies, initialState);
