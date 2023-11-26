"use client"

import Link from 'next/link'
import styled from 'styled-components'
import { Color } from '../consts'

const HeaderStyle = styled.div`
  width: 100%;
  background: ${Color.background};
  padding: 0.5rem;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 9999;
`

const LogoStyle = styled.div`
  font-weight: bold;
  font-size: 32px;
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    height: 40px;
    object-fit: contain;
  }
`

const MenuStyle = styled.menu`
  
`

export default function Header() {
  return (
    <HeaderStyle>
      <LogoStyle>
        <img src="./logo1.png"></img>
        <Link href="/">Animatch</Link>
      </LogoStyle>
      <MenuStyle>
      
      </MenuStyle>
    </HeaderStyle>
  )
}