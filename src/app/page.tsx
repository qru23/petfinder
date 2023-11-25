"use client"

import Image from 'next/image'
import { Button } from '@mantine/core'
import Link from 'next/link'

export default function Home() {
  return (
    <main 
      className=""
    >
      <Link href="/lost">
        <Button variant="filled" color="pink">Lost my pet</Button>
      </Link>

      <Link href="/found">
        <Button>Found a pet</Button>
      </Link>
    </main>
  )
}
