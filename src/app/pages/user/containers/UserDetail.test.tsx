import UserDetail, { testId } from './UserDetail';
import { renderWithProviders } from '@app/utils/test-utils';
import React from 'react';
import { screen, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter, Routes } from 'react-router';
import { RouterOutlet } from '@app/core/modules/custom-router-dom';
import userRoutes from '../user.routes';

const mockGetEmptyUser = rest.get(
  'https://jsonplaceholder.typicode.com/users/1',
  (req, res, ctx) => {
    return res(ctx.json({}), ctx.delay(150));
  }
);
const mockGetUserSuccess = rest.get(
  'https://jsonplaceholder.typicode.com/users/1',
  (req, res, ctx) => {
    return res(
      ctx.json(
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
      ),
      ctx.delay(150)
    );
  }
);
const mockGetUserError = rest.get(
  'https://jsonplaceholder.typicode.com/users/1',
  (req, res, ctx) => {
    return res(ctx.status(404), ctx.delay(150));
  }
);
const server = setupServer(mockGetUserSuccess);

describe('test UserDetail component', () => {

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());
  test('should render with initial state', () => {
    renderWithProviders(<UserDetail />, { route: '/user/1' });
    expect(
      screen.getByTestId(testId.userDetailPageContainer)
    ).toBeInTheDocument();
    expect(screen.getByTestId(testId.loadingSpinner)).toBeVisible();
  });
  test('should render with empty user', async () => {
    server.use(mockGetEmptyUser);
    renderWithProviders(<UserDetail />, { route: '/user/1' });
    screen.debug();
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner));
    screen.debug();
    expect(
      screen.getByTestId(testId.userDetailPageContainer)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(testId.userDetailId)
    ).toHaveTextContent('Not found');
  });
  test('should render with available user', async () => {
    renderWithProviders(<UserDetail />, { route: '/user/1' });
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner), {
      timeout: 2000,
    });
    expect(
      screen.getByTestId(testId.userDetailId)
    ).toHaveTextContent('1. Leanne Graham');
  });
  test('should render error message when API error', async () => {
    server.use(mockGetUserError);
    renderWithProviders(<UserDetail />, { route: '/user/1' });
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner), {
      timeout: 2000,
    });
    expect(screen.getByTestId(testId.userDetailPageContainer)).toHaveTextContent(
      'Error when loading user detail'
    );
  });
});
