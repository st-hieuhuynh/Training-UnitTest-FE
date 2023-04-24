/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../user.actions';
import { User } from '@app/core/models/user';
import { Link } from 'react-router-dom';

export const testId = {
  userListPageContainer: 'user-list',
  userListItem: 'user-list-item',
  userItem: 'user-item',
  loadingSpinner: 'loading-spinner',
};

const UserList = () => {
  const userList = useSelector(
    (state: any) => state.userListReducer.data
  ) as User[];
  const isLoading = useSelector(
    (state: any) => state.userListReducer.isLoading
  ) as User[];
  const error = useSelector(
    (state: any) => state.userListReducer.error
  ) as User[];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, []);
  return (
    <div data-testid={testId.userListPageContainer}>
      <h1>UserList</h1>
      {isLoading ? (
        <div data-testid={testId.loadingSpinner}>Loading...</div>
      ) : (
        <ul data-testid={testId.userListItem}>
          {userList?.length
            ? userList.map((item) => {
                return (
                  <div key={item.email} data-testid={testId.userItem}>
                    <Link to={`${item.id}`}>{item.name}</Link>
                  </div>
                );
              })
            : 'Not found any user'}
        </ul>
      )}
      {error ? 'Error when loading users' : ''}
    </div>
  );
};

export default UserList;
