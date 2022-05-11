import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

import {wrapper} from '../redux/store'
import {GTAG_TRACKER_ID, HOST_URL} from '../config'


function App({Component, pageProps}) {
  const router = useRouter()

  const _pathSliceLength = Math.min.apply(Math, [
    router.asPath.indexOf('?') > 0 ? router.asPath.indexOf('?') : router.asPath.length,
    router.asPath.indexOf('#') > 0 ? router.asPath.indexOf('#') : router.asPath.length
  ])
  const canonicalURL = HOST_URL + router.asPath.substring(0, _pathSliceLength)


  const handleRouteChange = (url) => {
    window.gtag('config', GTAG_TRACKER_ID, {
      page_path: url,
    })
  }

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>大類的技術手記</title>

        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西"/>
        <meta name="keywords" content="Python,Javascript,網站設計,兩大類"/>
        <meta name="author" content="兩大類"/>
        <meta name="og:image" content="/img/logo@250x250.jpg"/>

        <meta name="og:description" content="兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西"/>
        <meta name="google-site-verification" content="vVs2QVhF9I_65-WfH-RD2klXRwNA5hJT1VbICZv-0ZA"/>

        <link rel="canonical" href={canonicalURL}/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="alternate" type="application/atom+xml" title="大類的技術手記" href="/api/atom.xml"/>

        <script data-ad-client="ca-pub-9395644566418596" async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>

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
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App)
