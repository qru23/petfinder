"use client"

import Script from "next/script"
import { useEffect } from "react";

export default function PushScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://notix.io/ent/current/enot.min.js';
    script.async = true;
    script.onload = (sdk: any) => {
      sdk.startInstall(
        {
          "appId": "10065a7da65621e464f7cb95f4add16",
          "loadSettings": true
        }
      )
    }
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <></>   
  )
}