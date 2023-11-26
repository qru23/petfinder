"use client"

import { FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../components/Button'
import { InputStyle } from '../styles/InputStyle'
import { InputEvent } from '../types/events'
import { Pet } from '../types/pet'
import { Color, Paths } from '../consts'

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PhotoPreviewContainerStyle = styled.div`
  height: 300px;

  img {
    height: 100%;
    object-fit: contain;
  }
`

export default function FoundPage() {
  const [name, setName] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [photoPreview, setPhotoPreview] = useState<string | undefined>('')

  const [foundPets, setFoundPets] = useState<Pet[]>([])

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault()

    if (!photo) {
      console.error('Photo is required')
      return
    }

    ;(async () => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('phone', phone)
      formData.append('file', photo)
      formData.append('email', email)

      const { data } = await Axios.post(
        `${Paths.serverUrl}/found/`,
        formData
      )

      console.log('result', data)
      setFoundPets(data)
    })();

    console.log('submit', name, phone, email, photo)
  }, [name, phone, email, photo])

  useEffect(() => {
    if (!photo) return

    const objectUrl = URL.createObjectURL(photo)
    setPhotoPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  const selectPetHandler = useCallback((pet: Pet) => {
    if (!photo) {
      console.error('Photo is required')
      return
    }

    ;(async () => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('phone', phone)
      formData.append('file', photo)
      formData.append('email', email)
      formData.append('pet_id', pet.pet_id)

      const { data } = await Axios.post(
        `${Paths.serverUrl}/confirm_by_finder/`,
        formData
      )

      console.log('result', data)
    })()
  }, [name, phone, email, photo])

  if (foundPets.length > 0) {
    return (
      <FoundPetList 
        pets={foundPets}
        onSelectPet={pet => selectPetHandler(pet)}
      />
    )
  }

  return (
    <main>
      <FormStyle>
        <InputStyle
          placeholder="Name"
          value={name}
          onChange={(e: InputEvent) => setName(e.currentTarget.value)}
        />
        <InputStyle
          placeholder="Contact Number"
          value={phone}
          onChange={(e: InputEvent) => setPhone(e.currentTarget.value)}
        />
        <InputStyle
          placeholder="Email"
          value={email}
          onChange={(e: InputEvent) => setEmail(e.currentTarget.value)}
        />

        <InputStyle
          type="file"
          placeholder="Email"
          // value={photo?.name || undefined}
          accept="image/*" 
          capture={true}
          onChange={(e: SyntheticEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) {
              setPhoto(e.currentTarget.files[0])
            }
          }}
        />

        {
          photoPreview &&
          <PhotoPreviewContainerStyle>
            <img src={photoPreview}></img>
          </PhotoPreviewContainerStyle>
        }

        <ButtonStyle 
          onClick={submitHandler}
        >
          Submit
        </ButtonStyle>
      </FormStyle>
    </main>
  ) 
}

const FoundPetListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

function FoundPetList(
  { pets, onSelectPet }: 
  { pets: Pet[], onSelectPet: (pet: Pet) => void }
) {
  return (
    <> 
      <h2>We found some similar looking pets!</h2>
      <FoundPetListStyle>
      {
        pets.map(pet => (
          <FoundPetOption
            key={pet.pet_id}
            pet={pet}
            onSelectPet={() => { onSelectPet(pet) }}
          />
        ))
      }
      </FoundPetListStyle>
    </>
  )
}

const FoundPetOptionContainer = styled.div`
  background: ${Color.borders};
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem;
`

function FoundPetOption(
  { pet, onSelectPet }: 
  { pet: Pet, onSelectPet: () => void }
) {
  return (
    <FoundPetOptionContainer>
      <h2>{ pet.pet_name }</h2>

      <div>
      {
        pet.images.map(image => (
          <img
            src={`${Paths.serverUrl}${image.path}`}
          />
        ))
      }
      </div>

      <ButtonStyle
        onClick={onSelectPet}
      >
        Select {pet.pet_name}
      </ButtonStyle>
    </FoundPetOptionContainer>
  )
}