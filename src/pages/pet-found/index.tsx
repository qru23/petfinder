"use client"

import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Color, Paths } from '../../app/consts'
import { ButtonStyle } from '@/app/styles/ButtonStyle'
import { Pet } from '@/app/types/pet'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";

type FoundPet = {
  email: string;
  finder_name: string;
  image: string;
  pet_id: string;
  phone: string;
  pet: Pet;
}

const PetFoundPageContainer = styled.div`
  & > h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`

const PetImageContainer = styled.div`
  border-radius: 2rem;
  height: 600px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`

const ButtonsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`

export default function PetFoundPage() {
  const searchParams = useSearchParams()  
  const [foundPet, setFoundPet] = useState<FoundPet | undefined>(undefined)
  
  const [confirmPet, setConfirmPet] = useState<boolean>(false)

  useEffect(() => {
    if (!searchParams) return
    const id = searchParams.get('id')
    
    if (id) {
      ;(async () => {
        const { data } = await Axios.post(
          `${Paths.serverUrl}/found/id`,
          {
            id: id,
          }
        )

        console.log(data)
        setFoundPet(data)
      })();
    }
  }, [searchParams])

  if (!foundPet) {
    return (
      <p>Loading..</p>
    )
  }

  if (confirmPet) {
    return (
      <ConfirmPage
        foundPet={foundPet}
      />
    )
  }

  return (
    <PetFoundPageContainer>
      <h2>Is this {foundPet.pet.pet_name}?</h2>
      
      <PetImageContainer>
        <img 
          src={`${Paths.imageServerUrl}${foundPet.image.replace('/root/animatch_images/', '/')}`}
        />
      </PetImageContainer>

      <ButtonsContainer>
        <ButtonStyle
          onClick={(e: any) => { setConfirmPet(true) }}
        >Yes! ❤️</ButtonStyle>
        <ButtonStyle disabled={true}>No :(</ButtonStyle>
      </ButtonsContainer>
    </PetFoundPageContainer>
  )
}

const ConfirmPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
`

const ConfirmPageMetaStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
`

const DetailsContainer = styled.div`
  border: 4px solid ${Color.borders};
  padding: 2rem;
  border-radius: 2rem;
  width: 100%;

  & > p {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  & > button {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`

function ConfirmPage(
  { foundPet }:
  { foundPet: FoundPet }
) {
  return (
    <ConfirmPageStyle>
      <h2>Congratulation! 🎉</h2>

      <DetailsContainer>
        <p>Finder details:</p>
        <ConfirmPageMetaStyle>
          <FaPhoneAlt />
          <span>{foundPet.phone}</span>
        </ConfirmPageMetaStyle>
        <ConfirmPageMetaStyle>
          <MdEmail />
          <span>{foundPet.email}</span>
        </ConfirmPageMetaStyle>
        <ButtonStyle disabled={true}>
          <IoChatboxOutline />
          Live Chat
        </ButtonStyle>
      </DetailsContainer>

    </ConfirmPageStyle>
  )
}