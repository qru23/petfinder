import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AniMatch',
    short_name: 'AniMatch',
    description: 'AniMatch - Find your lost pets!',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/logo1.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}