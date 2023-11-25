"use client"

import { Button } from '@mantine/core'
import { FileInput, TextInput } from '@mantine/core'
import { FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`

export default function LostPage() {
  const [name, setName] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault()
    console.log('submit', name, files)
  }, [name, files])

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
        <FileInput
          label="Upload photo"
          onChange={setFiles}
          multiple
        />
        <Button 
          type="submit"
          variant={'filled'}
          color="pink"
        >Submit</Button>
      </FormStyle>
    </main>
  ) 
}