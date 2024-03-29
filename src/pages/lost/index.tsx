"use client"

import { FormEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../../app/styles/ButtonStyle'
import dynamic from 'next/dynamic'
import { LatLngLiteral } from 'leaflet'
import { InputStyle } from '../../app/styles/InputStyle'
import { InputEvent } from '../../app/types/events'
import { Paths } from '../../app/consts'
import { FaCheck } from "react-icons/fa";

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

const Map = dynamic(() => import('../../app/components/Map'), {
  ssr: false,
})

const PhotoPreviewsContainerStyle = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;

  img {
    height: 100%;
    object-fit: contain;
  }
`

export default function LostPage() {
  const [petName, setPetName] = useState<string>('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [reward, setReward] = useState<string>('')
  const [coords, setCoords] = useState<LatLngLiteral | undefined>(undefined)
  const [files, setFiles] = useState<File[]>([])

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault()

    ;(async () => {
      const formData = new FormData()

      formData.append('pet_name', petName)
      formData.append('owner_name', ownerName)
      formData.append('phone', phone)
      formData.append('reward', reward)

      if (coords) {
        formData.append('latitude', String(coords.lat))
        formData.append('longitude', String(coords.lng))
      }

      files.forEach(f => formData.append('files', f))

      console.log('Submitting lost pet', petName)
      setSubmitting(true)

      const { data } = await Axios.post(
        `${Paths.serverUrl}/lost/`,
        formData
      )

      if (!data.success) {
        console.error('There was an error submitting lost pet')
        return
      }

      setSubmitting(false)
      setSubmitSuccess(true)
    })();
  }, [petName, ownerName, phone, reward, coords, files])

  useEffect(() => {
    if (files.length === 0) return

    const objectUrls = files.map(f => URL.createObjectURL(f))
    setPhotoPreviews(objectUrls)

    return () => objectUrls.forEach(o => URL.revokeObjectURL(o))
  }, [files])

  if (submitSuccess) {
    return (
      <SubmitSuccessPage
        petName={petName}
      />
    )
  }

  return (
    <main>
      <FormStyle>
        <InputStyle
          value={petName}
          placeholder="Pet Name"
          onChange={(e: InputEvent)  => setPetName(e.currentTarget.value)}
        />

        <InputStyle
          value={ownerName}
          placeholder="Owner Name"
          onChange={(e: InputEvent)  => setOwnerName(e.currentTarget.value)}
        />

        <InputStyle 
          value={phone}
          placeholder="Phone"
          onChange={(e: InputEvent) => setPhone(e.currentTarget.value)}
        />

        <InputStyle 
          value={email}
          placeholder="Email"
          onChange={(e: InputEvent) => setEmail(e.currentTarget.value)}
        />

        <Map 
          onCoordinatesChange={setCoords}
        />

        <InputStyle
          value={reward}
          placeholder="Reward"
          onChange={(e: InputEvent) => setReward(e.currentTarget.value)}
        />
        
        <InputStyle
          type="file"
          multiple={true}
          onChange={(e: InputEvent) => {
            if (e.currentTarget.files) {
              setFiles(Array.from(e.currentTarget.files))
            }
          }}
        />

        {
          photoPreviews.length > 0 &&
          <PhotoPreviewsContainerStyle>
          {
            photoPreviews.map(photo => (
              <img 
                key={photo}
                src={photo}
              />
            ))
          }
          </PhotoPreviewsContainerStyle>
        }

        <SubmitButtonContainer>
          <ButtonStyle
            disabled={submitting}
            onClick={submitHandler}
          >
            { submitting ? 'Submitting' : 'Submit' }
          </ButtonStyle>
        </SubmitButtonContainer>

      </FormStyle>
    </main>
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
      <h2>We will let you know as soon as someone finds {petName}! ❤️</h2>
    </SubmitSuccessPageContainer>
  )
}