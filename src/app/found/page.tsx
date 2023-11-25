"use client"

import { FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../components/Button'
import { InputStyle } from '../styles/InputStyle'
import { InputEvent } from '../types/events'

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
        'http://46.101.212.106:8888/found/', 
        formData
      )

      console.log('result', data)
    })();

    console.log('submit', name, phone, email, photo)
  }, [name, phone, email, photo])

  useEffect(() => {
    if (!photo) return

    const objectUrl = URL.createObjectURL(photo)
    setPhotoPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

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