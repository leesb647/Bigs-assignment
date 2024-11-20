'use client'

import { Responsive } from "@/components/responsive"
import Quill from 'quill'
import { ChangeEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import EditorCategory from "./editor-category"

export interface EditorProps {
  title: string
  content: string
  onChangeField: (v: string, key: 'content' | 'title' | 'category') => void
}

export const Editor = ({ title, content, onChangeField}: EditorProps) => {
  const quillElement = useRef(null)
  const quillInstance = useRef(null)
  
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered'}, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    })

    const quill = quillInstance.current
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user' && quill) {
        onChangeField(quill.root.innerHTML, 'content')
      }
    })
  }, [])

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    onChangeField(e.target.value, 'title')
  }


  return (
    <Container>
      <EditorCategory />
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={onChangeTitle}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </Container>
  )
}

export default Editor

const Container = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid grey;
  margin-bottom: 2rem;
  width: 100%;
`

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank ::before {
    left: 0px
  }
`