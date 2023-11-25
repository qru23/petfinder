"use client"

import { FileInput, TextInput } from '@mantine/core'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { ButtonStyle } from '../components/Button'
import dynamic from 'next/dynamic'
import { LatLngLiteral } from 'leaflet'

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
`

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
})

export default function LostPage() {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [reward, setReward] = useState<string>('')
  const [coords, setCoords] = useState<LatLngLiteral | undefined>(undefined)
  const [files, setFiles] = useState<File[]>([])

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

  return (
    <main>
      <h1>Lost</h1>

      <FormStyle 
        onSubmit={submitHandler}
      >
        <TextInput
          label="Pet name"
          placeholder="Pet Name"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <TextInput 
          label="Contact Number"
          value={phone}
          onChange={e => setPhone(e.currentTarget.value)}
        />
        <TextInput
          label="Reward"
          value={reward}
          onChange={e => setReward(e.currentTarget.value)}
        />
        <FileInput
          label="Upload photo"
          onChange={setFiles}
          multiple
        />

        <Map 
          onCoordinatesChange={setCoords}
        />

        <ButtonStyle onClick={submitHandler}>Submit</ButtonStyle>
      </FormStyle>
    </main>
  ) 
}