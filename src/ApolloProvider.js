import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api-apeast.graphcms.com/v1/ck3u2hmr80b9h01hf2qpq6qar/master',
    cache: new InMemoryCache()
});


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)