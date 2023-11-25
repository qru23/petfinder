"use client"

import { FormEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../components/Button'
import dynamic from 'next/dynamic'
import { LatLngLiteral } from 'leaflet'
import { InputStyle } from '../styles/InputStyle'
import { InputEvent } from '../types/events'

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Map = dynamic(() => import('../components/Map'), {
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
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [reward, setReward] = useState<string>('')
  const [coords, setCoords] = useState<LatLngLiteral | undefined>(undefined)
  const [files, setFiles] = useState<File[]>([])

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault()

    ;(async () => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('phone', phone)
      formData.append('reward', reward)

      if (coords) {
        formData.append('latitude', String(coords.lat))
        formData.append('longitude', String(coords.lng))
      }

      files.forEach(f => formData.append('files', f))

      const { data } = await Axios.post(
        'http://46.101.212.106:8888/embed/', 
        formData
      )

      console.log('result', data)
    })();

    console.log('submit', name, files)
  }, [name, phone, reward, coords, files])

  useEffect(() => {
    if (files.length === 0) return

    const objectUrls = files.map(f => URL.createObjectURL(f))
    setPhotoPreviews(objectUrls)

    return () => objectUrls.forEach(o => URL.revokeObjectURL(o))
  }, [files])

  return (
    <main>
      <FormStyle>
        <InputStyle
          value={name}
          placeholder="Name"
          onChange={(e: InputEvent)  => setName(e.currentTarget.value)}
        />

        <InputStyle 
          value={phone}
          placeholder="Phone"
          onChange={(e: InputEvent) => setPhone(e.currentTarget.value)}
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

        <ButtonStyle onClick={submitHandler}>Submit</ButtonStyle>
      </FormStyle>
    </main>
  ) 
}