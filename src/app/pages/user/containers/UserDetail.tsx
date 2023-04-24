/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '@app/core/models/user';
import { getUserDetail } from '../user.actions';

export const testId = {
  userDetailPageContainer: 'user-detail',
  userDetailId: 'user-detail-id',
  loadingSpinner: 'loading-spinner',
};

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: any) => state.userDetailReducer.isLoading
  );
  console.log('huhu', id)
  const error = useSelector((state: any) => state.userDetailReducer.error);
  const userDetail = useSelector(
    (state: any) => state.userDetailReducer.data
  ) as User;

  useEffect(() => {
    dispatch(getUserDetail(1));
  }, []);

  return (
    <div data-testid={testId.userDetailPageContainer}>
      UserDetail
      {isLoading ? (
        <div data-testid={testId.loadingSpinner}>Loading...</div>
      ) : (
        <div data-testid={testId.userDetailId}>{userDetail?.id ? `${userDetail?.id}. ${userDetail?.name}` : 'Not found' }</div>
      )}
      {error ? 'Error when loading user detail' : ''}
    </div>
  );
};

export default UserDetail;
