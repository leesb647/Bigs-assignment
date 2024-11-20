'use client'

import { Responsive } from "@/components/responsive"
import styled from "styled-components"
import Button from "@/components/styled-button"
import EditorContainer from "./components/editor-container"
import { useStores } from "@/store/context"
import { postBoard } from "@/actions/board/post-board"
import { useRouter } from "next/navigation"


export default function WritePage () {
  const { boardStore, authStore } = useStores()
  const router = useRouter()
  
  const onClick = async () => {
    try {
      const accessToken = await authStore.getAccessToken()
      if (accessToken != null) {
        const result = await postBoard({accessToken, ...boardStore.board})
        console.log(result)
        if (result.status === 'success') {
          router.push(`/boards/${result.data.id}`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Responsive>
        <EditorContainer />
        <WriteButtonContainer>
          <StyledButton $cyan onClick={onClick}>
            포스트 등록
          </StyledButton>
        </WriteButtonContainer>
      </Responsive>
    </>
  )
}

const WriteButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`

const StyledButton = styled(Button)`
  height: 2.125rem
  & + & {
    margin-left: 0.5rem;
  }
`