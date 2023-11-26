"use client"

import { FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../../app/styles/ButtonStyle'
import { InputStyle } from '../../app/styles/InputStyle'
import { InputEvent } from '../../app/types/events'
import { Pet } from '../../app/types/pet'
import { Color, Paths } from '../../app/consts'
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel'
import { FaCheck } from 'react-icons/fa'

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 200px;
  }
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
  const [submittingFound, setSubmittingFound] = useState<boolean>(false)

  const [foundPets, setFoundPets] = useState<Pet[]>([])
  const [confirmedPet, setConfirmedPet] = useState<Pet | undefined>(undefined)

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

      setSubmittingFound(true)
      const { data } = await Axios.post(
        `${Paths.serverUrl}/confirm_by_finder/`,
        formData
      )

      console.log('result', data)
      setSubmittingFound(false)
      setConfirmedPet(pet)
    })()
  }, [name, phone, email, photo, setSubmittingFound])

  if (confirmedPet !== undefined) {
    return (
      <SubmitSuccessPage
        petName={confirmedPet.pet_name}
      />
    )
  }

  if (foundPets.length > 0) {
    return (
      <FoundPetList 
        pets={foundPets}
        onSelectPet={pet => selectPetHandler(pet)}
      />
    )
  }

  console.log(submittingFound)

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

        <SubmitButtonContainer>
          <ButtonStyle
            disabled={submittingFound}
            onClick={submitHandler}
          >
            { submittingFound ? 'Searching..' : 'Submit' }
          </ButtonStyle>
        </SubmitButtonContainer>

      </FormStyle>
    </main>
  ) 
}

const FoundFoundWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;

  & > h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`

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
    <FoundFoundWrapperStyle> 
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
    </FoundFoundWrapperStyle>
  )
}

const FoundPetOptionContainer = styled.div`
  background: ${Color.borders};
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
`

const CarouselContainerStyle = styled.div`
  height: 500px;
  display: flex;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

const CarouselImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`

const FoundPetOptionTitle = styled.h2`
  font-size: 2rem;
  color: #111;
  text-align: center;
  margin-bottom: 1rem;
`

function FoundPetOption(
  { pet, onSelectPet }: 
  { pet: Pet, onSelectPet: () => void }
) {
  return (
    <FoundPetOptionContainer>
      <FoundPetOptionTitle>
        { pet.pet_name }
      </FoundPetOptionTitle>

      <CarouselContainerStyle>
        <Carousel
          loop={true}
          draggable={true}
        >
        {
          pet.images.map(image => (
            <Carousel.Slide
              key={image.path}
              className="overflow-hidden"
            >
              <CarouselImageStyle 
                src={image.path}
              />
            </Carousel.Slide>
          ))
        }
        </Carousel>
      </CarouselContainerStyle>

      <ButtonStyle
        onClick={onSelectPet}
      >
        Select {pet.pet_name}
      </ButtonStyle>
    </FoundPetOptionContainer>
  )
}

const SubmitSuccessPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

function SubmitSuccessPage(
  { petName }: 
  { petName: string }
) {
  return (
    <SubmitSuccessPageContainer>
      <FaCheck 
        size={150}
        color={'#218f3c'}
        className="mb-8"
      />
      <h2>Thank you for finding {petName}!</h2>
      <h3>We will let their owner know as soon as possible!</h3>
    </SubmitSuccessPageContainer>
  )
}