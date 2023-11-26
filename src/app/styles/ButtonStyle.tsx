import { ReactNode } from "react";
import styled from 'styled-components'
import { Color } from "../consts";

export const ButtonStyle = styled.button`
  border-radius: 0.4rem;
  padding: 0.4rem 1rem;
  background: ${Color.accent};
  border: 2px solid ${Color.borders};
  color: #111;

  &:disabled {
    opacity: 0.7;
  }
`