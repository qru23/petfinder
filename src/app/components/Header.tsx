"use client"

import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyle = styled.div`
  width: 100%;
  background: white;
  padding: 0.5rem;
`

const LogoStyle = styled.div`
  
`

const MenuStyle = styled.menu`
  
`
export default function Header() {
  return (
    <HeaderStyle>
      <LogoStyle>
        <Link href="/">AniMatch</Link>
      </LogoStyle>
      <MenuStyle>
      
      </MenuStyle>
    </HeaderStyle>
  )
}