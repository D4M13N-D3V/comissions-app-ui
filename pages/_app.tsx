// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

import { UserProvider } from "@auth0/nextjs-auth0/client";
// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from '../configs/themeConfig'

// ** Component Imports
import UserLayout from '../layouts/UserLayout'
import ThemeComponent from '../core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from '../core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from '../core/utils/create-emotion-cache'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}



// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const { user } = pageProps;
  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  const [isRootPath, setIsRootPath] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    setIsRootPath(router.pathname === '/');
  }, [router.pathname]);

  return (
  <UserProvider user={user}>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`Request.Box`}</title>
        <meta
          name='description'
          content={`Request.Box is a platform for artists to allow their followered to request art pieces while allowing the artist complete control of the terms and timeframe.`}
        />
        <meta name='keywords' content='Art, Commission, Skeb, Artwork, Freelance, Illustration, Vtuber, Vtubing, Vtuber Rigging, Illustration' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {{
              if (isRootPath) {
                return <ThemeComponent settings={settings}><Component {...pageProps} /> </ThemeComponent>
              } else {
                return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>;
              }
          }}}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
    </UserProvider>
  )
}

export default App