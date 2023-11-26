"use client"

import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Axios from 'axios'
import { Paths } from '../../app/consts'

export default function PetFoundPage() {
  const searchParams = useSearchParams()  
  
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
      })();
    }
  }, [searchParams])

  return (
    <></>
  )
}