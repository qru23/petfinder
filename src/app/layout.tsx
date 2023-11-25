import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MantineProvider, createTheme } from '@mantine/core';
import Header from './components/Header';
import PageContainer from './components/PageContainer';

import '@mantine/core/styles.css';

const theme = createTheme({})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AniMatch',
  description: 'Find your lost pets!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Header />
          <PageContainer>
            {children}
          </PageContainer>
        </MantineProvider>
      </body>
    </html>
  )
}
