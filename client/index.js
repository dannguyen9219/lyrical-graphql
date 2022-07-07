import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
