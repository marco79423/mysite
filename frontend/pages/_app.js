import Head from 'next/head'


export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>大類的技術筆記</title>

        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西"/>
        <meta name="keywords" content="Python,Javascript,網站設計,兩大類"/>
        <meta name="author" content="兩大類"/>
        <meta name="og:image" content="/img/logo@250x250.jpg"/>

        <meta name="og:description" content="兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西"/>
        <meta name="google-site-verification" content="vVs2QVhF9I_65-WfH-RD2klXRwNA5hJT1VbICZv-0ZA"/>

        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="alternate" type="application/atom+xml" title="大類的技術筆記" href="/api/atom.xml"/>

        <script data-ad-client="ca-pub-9395644566418596" async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
