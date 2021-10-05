import Head from 'next/head'


export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charSet="UTF-8"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="alternate" type="application/atom+xml" title="兩大類的網站" href="/atom.xml"/>
        <script data-ad-client="ca-pub-9395644566418596" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
      </Head>

      <Component {...pageProps} />

      {/*Global site tag (gtag.js) - Google Analytics*/}
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38552387-1"/>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || []

          function gtag() {
            dataLayer.push(arguments)
          }

          gtag('js', new Date())

          gtag('config', 'UA-38552387-1')
        `
      }}/>
    </>
  )
}
