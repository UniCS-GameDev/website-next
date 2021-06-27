import React from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/sunburst.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/sunburst.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
