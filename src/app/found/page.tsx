"use client"

import Image from 'next/image'
import { Button, Input } from '@mantine/core'
import styled from 'styled-components'
import Camera from 'react-html5-camera-photo'
import { useCallback } from 'react'
const FormStyle = styled.form`
  
`

export default function FoundPage() {
  const photoHandler = useCallback((uri: string) => {
    console.log('Took picture!', uri)
  }, [])
  
  return (
    <main>
      <h1>Found</h1>

      <FormStyle>
        <Input></Input>
        <Camera
          onTakePhoto={photoHandler}
        />
      </FormStyle>
    </main>
  ) 
}