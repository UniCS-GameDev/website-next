import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/layout.css';
import '../styles/menu.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
