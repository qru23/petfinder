import PushScript from '@/app/components/PushScript';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../app/components/Header';
import styled from 'styled-components'
import { MantineProvider, createTheme } from '@mantine/core';

import '@mantine/core/styles.css';
import '../app/globals.css'
import { Color } from '@/app/consts';

const theme = createTheme({})

const PageContainerStyle = styled.div`
  padding: 0.5rem 0.5rem;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;

  & > .content {
    width: 100%;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  useEffect(() => {
    console.log(router)
  }, [router])

  return (
    <>
      <Head>
        <title>AniMatch</title>
        <link rel="icon" href="/logo1.png" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <>
        <MantineProvider theme={theme}>
          {
            router.route !== '/' &&
            <Header/>
          }

          <PageContainerStyle>
            <div className='content'>
              <Component {...pageProps} />
            </div>
          </PageContainerStyle>
          <PushScript/>
        </MantineProvider>

      </>
    </>
  )
}