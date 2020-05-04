import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import store from './store';
import AuthContext from './components/context';
import { useAuth } from './components/hooks';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const WrappedApp = () => {
  const fileReader = new FileReader();

  const { token, userId, logout, login } = useAuth();
  const isAuthenticated = !!token;

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <AuthContext.Provider
            value={{ fileReader, token, userId, logout, login, isAuthenticated }}
          >
            <Router>
              <App />
            </Router>
          </AuthContext.Provider>
        </ApolloProvider>
      </ErrorBoundary>
    </Provider>
  );
};

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
