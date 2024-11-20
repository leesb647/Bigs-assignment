'use client'

import { removePost } from "@/actions/board/delete-post"
import Button from "@/components/styled-button"
import { useStores } from "@/store/context"
import { useRouter } from "next/navigation"
import styled from "styled-components"

export interface PostViewerProps {
  id: number
  title: string
  createdAt: string
  content: string
  boardCategory: string
}

export const PostViewer = ({ id, title, createdAt, content, boardCategory }: PostViewerProps) => {
  const { authStore: { getAccessToken } } = useStores()
  const router = useRouter()
  

  const deletePost = async () => {
    const accessToken = await getAccessToken()
    try {
      if (accessToken) {
        const result = await removePost({accessToken, id})
        if (result.status === 'success') {
          router.push('/boards')
        } else {
          console.log('error')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const modifyPost = async () => {
    router.push('/boards')
  }

  return (
    <PostViewerContainer>
      <ButtonContainer>
        <Button $cyan onClick={modifyPost}>수정하기</Button>
        <Button onClick={deletePost}>삭제하기</Button>
      </ButtonContainer>
      
      <PostHead>
        <h1>{title}</h1>
        <SubInfo>
          <span>
            <b>tester {boardCategory}</b>
          </span>
          <span>{createdAt}</span>
        </SubInfo>
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PostViewerContainer>
  )
}

export default PostViewer

const PostViewerContainer = styled.div`
  margin-top: 2rem;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;

  > :first-child {
    margin-right: 1rem;
  }
`

const PostHead = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    line-height: 1.5;
    margin: 0;
  }
`

const SubInfo = styled.div`
  margin-top: 1rem;
  color: gray;

  span + span:before {
    color: gray;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`

const PostContent = styled.div`
  font-size: 1.3rem;
  color: gray;
`