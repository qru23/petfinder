"use client"

import Image from 'next/image'
import Link from 'next/link'
import Button from './components/Button'

export default function Home() {
  return (
    <main 
      className=""
    >
      <Link href="/lost">
        <Button>
          Lost my pet
        </Button>
      </Link>

      <Link href="/found">
        <Button>Found a pet</Button>
      </Link>
    </main>
  )
}
