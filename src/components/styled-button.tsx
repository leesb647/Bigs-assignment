import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface StyledButtonProps {
  $fullwidth?: boolean
  $cyan?: boolean
  to?: string
}

const Button = ({ to, $cyan, $fullwidth, ...rest }: StyledButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) =>{
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to && history) {
      router.push(to)
    }
    if (rest.onClick) {
      rest.onClick(e)
    }
  }

  return <StyledButton $cyan={$cyan} $fullwidth={$fullwidth} {...rest} onClick={onClick}/>
}

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: grey;
  &:hover {
    background: grey;
  }

  ${props => 
    props.$fullwidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `
  }

  ${props =>
    props.$cyan &&
    css`
      background: #22b8cf;
      &:hover {
        background: #66d9e8;
      }
    `
  }
`

export default Button;
