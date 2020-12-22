//

import React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		// console.log('ctx.pathname ', ctx.pathname);
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
		// return await Document.getInitialProps(ctx)
	}
	
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

/*

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css"
            integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy"
            crossOrigin="anonymous"
          />
          <style>{`
            .page {
              height: 100vh;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


import Document, { Html, Head, Main, NextScript } from 'next/document'
import cxs from 'cxs/lite'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage()
    const style = cxs.getCss()
    return { ...page, style }
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="cxs-style"
            dangerouslySetInnerHTML={{ __html: this.props.style }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default App



import Document, { Html, Head, Main, NextScript } from 'next/document'
import { StyleSheetServer } from 'aphrodite'

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const { html, css } = StyleSheetServer.renderStatic(() => renderPage())
    const ids = css.renderedClassNames
    return { ...html, css, ids }
  }

  render() {
    const { css, ids } = this.props
    return (
      <Html>
        <Head>
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: css.content }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {ids && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__REHYDRATE_IDS = ${JSON.stringify(ids)}
                `,
              }}
            />
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument


import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}

*/
