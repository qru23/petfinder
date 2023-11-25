"use client"

import Script from "next/script"

export default function PushScript() {
  return (
    <Script
      src="https://notix.io/ent/current/enot.min.js"
      onLoad={(sdk: any) => {
        sdk.startInstall(
          {
            "appId": "10065a7da65621e464f7cb95f4add16",
            "loadSettings": true
          }
        )
      }}
    />    
  )
}