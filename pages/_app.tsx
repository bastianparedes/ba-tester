import React from 'react';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'bastianparedes/styles/global.css';
import 'bastianparedes/styles/normalize.css';
import '../styles/styles.scss';
import apolloClient from '../lib/apollo';
import { basePath } from '../next.config';

const _App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link href={String(basePath) + '/favicon.ico'} rel="icon" />
        <title>Bastián Paredes</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default _App;
