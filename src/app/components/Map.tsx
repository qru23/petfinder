import { MapContainer, TileLayer, useMap, useMapEvents, Marker } from 'react-leaflet'
import { DivIcon, Icon, LatLng, LatLngLiteral } from 'leaflet'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useState } from 'react';
import { ButtonStyle } from '../styles/ButtonStyle';

const LocalRequestContainerStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`

export default function Map(
  { onCoordinatesChange }: { onCoordinatesChange: (coords: LatLngLiteral) => void }
) {
  return (
    <div id="map">
      <MapContainer
        center={[51, 0]} 
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        style={{
          height:300
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          onCoordinatesChange={onCoordinatesChange}
        />
      </MapContainer>
    </div>
  )
}

function LocationMarker(
  { onCoordinatesChange }: { onCoordinatesChange: (coords: LatLngLiteral) => void }
) {
  const map = useMap()

  const [coordinates, setCoordinates] 
    = useState<LatLngLiteral | undefined>(undefined)

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      console.log('location', position)

      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  const enableLocationHandler = useCallback(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      console.log('location', position)

      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])
  
  useEffect(() => {
    if (coordinates === undefined) return
    console.log('set coords', coordinates)

    map.flyTo(coordinates)
    onCoordinatesChange(coordinates)
  }, [coordinates, map])
  
  return (
    <>
    {
      coordinates ?
      <Marker
        position={coordinates}
        icon={new Icon({
          iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'})
        }
      />
      :
      <LocalRequestContainerStyle>
        test
        <ButtonStyle
          onClick={enableLocationHandler}
        >Add Location</ButtonStyle>
      </LocalRequestContainerStyle>
    }
    </>
  )
}