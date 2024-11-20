'use client'

import Link from "next/link";
import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function AuthLayout({ children }: PropsWithChildren) {
  
  return (
    <AuthTemplateContainer>
      <WhiteBox>
        <div className="logo-area">
          <Link href="/"><h1>B  I  G  S</h1></Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateContainer>
  )
}

const AuthTemplateContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
  
  @media (max-width: 425px) {
    width: 100%
  }


`