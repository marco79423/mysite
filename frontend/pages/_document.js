import Document, {Head, Html, Main, NextScript} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

import {GTAG_TRACKER_ID} from '../config'
import createEmotionCache from '../lib/createEmotionCache'

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    // Emotion
    const cache = createEmotionCache()
    const {extractCriticalToChunks} = createEmotionServer(cache)

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) => (
          <App emotionCache={cache} {...props} />
        ),
      })

    const initialProps = await Document.getInitialProps(ctx)
    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: style.css}}
      />
    ))

    return {
      ...initialProps,
      emotionStyleTags,
    }
  }

  render() {
    return (
      <Html lang="zh-hant">
        <Head>
          <meta charSet="UTF-8"/>

          <script data-ad-client="ca-pub-9395644566418596" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_TRACKER_ID}`}/>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_TRACKER_ID}', { page_path: window.location.pathname });
            `,
            }}
          />

          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
