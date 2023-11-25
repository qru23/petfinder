"use client"

import Script from "next/script"

export default function PushScript() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `
      <script id="script">
        var s = document.createElement("script")
        s.src = "https://notix.io/ent/current/enot.min.js"
        s.onload = function (sdk) {
          sdk.startInstall(
            {
              "appId": "10065a7da65621e464f7cb95f4add16",
              "loadSettings": true
            }
          )
        }
        document.head.append(s)
      </script>
      `
    }}>

    </div>
    // <Script
    //   src="https://notix.io/ent/current/enot.min.js"
    //   onLoad={(sdk: any) => {
    //     console.log(sdk)
    //     sdk.startInstall(
    //       {
    //         "appId": "10065a7da65621e464f7cb95f4add16",
    //         "loadSettings": true
    //       }
    //     )
    //   }}
    // />    
  )
}