import { ReactNode } from "react";
import styled from 'styled-components'
import { Color } from "../consts";

export const ButtonStyle = styled.button`
  border-radius: 0.4rem;
  padding: 0.4rem 1rem;
  background: ${Color.accent};
  color: #111;
`

export default function Button({ children }: { children: ReactNode }) {
  return (
    <ButtonStyle>
      {children}
    </ButtonStyle>
  )
}