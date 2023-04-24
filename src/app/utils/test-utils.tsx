import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import appMiddleware from '@app/app.middleware';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import appReducer from '@app/app.reducers';
import userEvent from '@testing-library/user-event';

const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware));

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: typeof store;
  route?: string;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = createStore(appReducer, applyMiddleware(middleware)),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    middleware.run(appMiddleware);
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
