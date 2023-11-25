import { ReactNode } from "react";
import styled from 'styled-components'

export const ButtonStyle = styled.button`
  border-radius: 0.4rem;
  padding: 0.4rem 1rem;
  background: pink;
`

export default function Button({ children }: { children: ReactNode }) {
  return (
    <ButtonStyle>
      {children}
    </ButtonStyle>
  )
}