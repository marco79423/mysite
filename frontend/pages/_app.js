import React from 'react'
import {useRouter} from 'next/router'
import {DefaultSeo} from 'next-seo'
import {CacheProvider} from '@emotion/react'

import {GTagTrackerId, HostUrl} from '../config'
import createEmotionCache from '../lib/createEmotionCache'
import useCanonicalUrl from '../lib/useCanonicalUrl'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function App({Component, emotionCache = clientSideEmotionCache, pageProps}) {
  const router = useRouter()
  const canonicalUrl = useCanonicalUrl(HostUrl)

  const handleRouteChange = (url) => {
    window.gtag('config', GTagTrackerId, {
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
    <CacheProvider value={emotionCache}>
      <DefaultSeo
        title={'大類的技術手記'}
        titleTemplate={'%s - 大類的技術手記'}
        description={'兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西'}
        canonical={canonicalUrl}

        twitter={{
          cardType: 'summary_large_image',
          handle: '@marco79423',
        }}

        openGraph={{
          images: [
            {url: `${HostUrl}/img/logo@250x250.jpg`},
          ],
          site_name: '大類的技術手記',
        }}

        additionalMetaTags={[
          {
            charSet: 'UTF-8',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
          },
          {
            name: 'google-site-verification',
            content: 'vVs2QVhF9I_65-WfH-RD2klXRwNA5hJT1VbICZv-0ZA'
          },
        ]}

        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'manifest',
            href: '/manifest.json'
          },
          {
            rel: 'alternate',
            type: 'application/atom+xml',
            title: '大類的技術手記',
            href: '/api/atom.xml'
          },
        ]}
      />

      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default App
