"use client"

import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Paths } from '../../app/consts'
import { ButtonStyle } from '@/app/styles/ButtonStyle'
import { Pet } from '@/app/types/pet'

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
  }
`

const PetImageContainer = styled.div`
  border-radius: 1rem;  
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
          src={`${foundPet.image.replace('/root/animatch_images/', '/')}`}
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

function ConfirmPage(
  { foundPet }:
  { foundPet: FoundPet }
) {
  return (
    <ConfirmPageStyle>
      <h2>Amazing! 🎉</h2>
      <p>Finder phone: {foundPet.phone}</p>
      <p>Finder email: {foundPet.email}</p>
    </ConfirmPageStyle>
  )
}