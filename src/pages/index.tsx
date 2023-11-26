"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ButtonStyle } from '../app/styles/ButtonStyle'
import styled from 'styled-components'

const HomeContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > img {
    height: 400px;
    object-fit: contain;
  }

  & > h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }
`

const LinksContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`

export default function Home() {
  return (
    <HomeContainerStyle>
      <img 
        src="./home-logo.png"
        alt="AniMatch logo"
      />
      <h1>Animatch</h1>

      <LinksContainerStyle>
        <Link href="/lost">
          <ButtonStyle>
            Lost my pet
          </ButtonStyle>
        </Link>

        <Link href="/found">
          <ButtonStyle>
            Found a pet
          </ButtonStyle>
        </Link>
      </LinksContainerStyle>
    </HomeContainerStyle>
  )
}
