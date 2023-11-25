"use client"

import { ReactNode } from "react";
import styled from 'styled-components'

const PageContainerStyle = styled.main`
  padding: 0.5rem 0.5rem;
  padding-top: 50px;
`

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <PageContainerStyle>
      {children}
    </PageContainerStyle>
  )
}