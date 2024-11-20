'use client'

import { useRouter } from "next/navigation"
import styled from "styled-components"

export interface PostItemProps {
  id: number,
  title: string,
  category: string,
  createdAt: string,
}

export const PostItem = ({ id, title, category, createdAt }: PostItemProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/boards/${id}`)
  }

  return (
    <>
      <PostItemContainer onClick={onClick}>
        <div>
          <SubInfo>
            <h3>{`[${category}]`}</h3>
            <span>{createdAt}</span>
          </SubInfo>
          <h2>{title}</h2>
        </div>
      </PostItemContainer>
    </>
    
  )
}

const PostItemContainer = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  &:hover {
    background-color: aliceblue;
  }

  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid gray;
  }

  > div {
    margin-left: 0.5rem;
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.1rem;
    margin-top: 0;
  }
  h3 {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    margin-top: 0;
  }
  p {
    margin-top: 2rem;
  }
  span {
    font-size: 0.75rem
  }
`

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;

  > h3 {
    margin-right: 0.5rem;
  } 
`