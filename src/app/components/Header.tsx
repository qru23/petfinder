"use client"

import Link from 'next/link'
import styled from 'styled-components'
import { Color } from '../consts'

const HeaderStyle = styled.div`
  width: 100%;
  background: ${Color.background};
  padding: 0.5rem;
  position: fixed;
`

const LogoStyle = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const MenuStyle = styled.menu`
  
`
export default function Header() {
  return (
    <HeaderStyle>
      <LogoStyle>
        <Link href="/">Animatch</Link>
      </LogoStyle>
      <MenuStyle>
      
      </MenuStyle>
    </HeaderStyle>
  )
}