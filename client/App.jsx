import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import AppNavbar from './src/components/Navbar';

const httpLink = createHttpLink({
    uri: '/graphql',
  });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export default App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="flex-column justify-flex-start min-100-vh">
                <AppNavbar />
                <div className="container">
                <Outlet />
                </div>
            </div>
        </ApolloProvider>
    );
};