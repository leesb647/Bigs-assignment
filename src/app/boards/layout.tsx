'use client'

import { Header } from "@/components/header"
import { PropsWithChildren } from "react"
import styled from "styled-components"

export default function BoardLayout({children}: PropsWithChildren) {
  return (
    <BoardLayoutContainer>
      <Header />
      <BodyLayoutContainer>
        {children}
      </BodyLayoutContainer>
    </BoardLayoutContainer>
  )
}

const BoardLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BodyLayoutContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%
  }
`