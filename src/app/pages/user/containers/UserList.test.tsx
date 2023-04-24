import React from 'react';
import UserList, { testId } from './UserList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderWithProviders } from '@app/utils/test-utils';

const mockGetZeroItem = rest.get(
  'https://jsonplaceholder.typicode.com/users',
  (req, res, ctx) => {
    return res(ctx.json([]), ctx.delay(150));
  }
);
const mockGetOneItem = rest.get(
  'https://jsonplaceholder.typicode.com/users',
  (req, res, ctx) => {
    return res(
      ctx.json([
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
      ]),
      ctx.delay(150)
    );
  }
);
const mockGetItemError = rest.get(
  'https://jsonplaceholder.typicode.com/users',
  (req, res, ctx) => {
    return res(ctx.status(404), ctx.delay(150));
  }
);
const server = setupServer(mockGetOneItem);
describe('test UserList component', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());
  // Test cases
  test('should render with initial state', () => {
    renderWithProviders(<UserList />);
    expect(
      screen.getByTestId(testId.userListPageContainer)
    ).toBeInTheDocument();
    expect(screen.getByTestId(testId.loadingSpinner)).toBeVisible();
  });
  test('should render with no data within list fetched', async () => {
    server.use(mockGetZeroItem);
    renderWithProviders(<UserList />);
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner), {
      timeout: 5000,
    });
    expect(screen.getByTestId(testId.userListItem)).toBeInTheDocument();
    expect(screen.getByTestId(testId.userListItem)).toHaveTextContent(
      'Not found any user'
    );
  });
  test('should render with only one data within list', async () => {
    renderWithProviders(<UserList />);
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner), {
      timeout: 5000,
    });
    expect(screen.getByTestId(testId.userListItem)).toBeInTheDocument();
    expect(screen.getAllByTestId(testId.userItem).length).toBe(1);
  });
  test('should show error message when API error', async () => {
    server.use(mockGetItemError);
    renderWithProviders(<UserList />);
    await waitForElementToBeRemoved(screen.getByTestId(testId.loadingSpinner), {
      timeout: 5000,
    });
    expect(screen.getByTestId(testId.userListItem)).toBeInTheDocument();
    expect(screen.getByTestId(testId.userListPageContainer)).toHaveTextContent(
      'Error when loading users'
    );
  });
});
