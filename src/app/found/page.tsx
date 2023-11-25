"use client"

import Image from 'next/image'
import { Button, Input } from '@mantine/core'
import styled from 'styled-components'
import { useCallback } from 'react'
const FormStyle = styled.form`
  
`

export default function FoundPage() {
  // const [photo, setPhoto] = useState<File
  return (
    <main>
      <h1>Found</h1>

      <FormStyle>
        <input 
          type="file" 
          accept="image/*" 
          capture={true}
        />
      </FormStyle>
    </main>
  ) 
}