'use client'

import styled from "styled-components"
import { PostItem } from "./components/post-item"
import Pagination from "@/app/boards/(list)/components/pagination"
import { useBoards } from "./hooks/use-boards"
import Button from "@/components/styled-button"

const mockPostData = [
  {
    id: 999990,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.1",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999991,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.2",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999992,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.3",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999993,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.4",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999994,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.5",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999995,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.6",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999996,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.7",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999997,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.8",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999998,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.9",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 999999,
    title: "게시된 게시물을 보기 위한 예제 게시물 입니다.10",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
]

export default function PostListPage() {
  const { data } = useBoards()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <PostListContainer>
      <WritePostButtonWrapper>
        <Button $cyan to="/boards/write">
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      {
        data.content.length
          ? data.content.map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                category={post.boardCategory}
                createdAt={post.createdAt}
              />
            ))
          : (
            <>
              {mockPostData.map((post) => (
                <PostItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  category={post.boardCategory}
                  createdAt={post.createdAt}
                />
              ))}
              <EmptyPostListContainer>
                <h1>현재 포스팅된 글이 없습니다.</h1>
              </EmptyPostListContainer>
            </>
          )
      }
      <Pagination
        totalElements={112}
        size={10}
        pageSize={5}
        number={1}
        totalPages={12}
        first={true}
        last={false}
      />
    </PostListContainer>
  )
}

const PostListContainer = styled.div`
  margin-top: 0.5rem
`

const WritePostButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 0.5rem;
  /* top: 2rem;
  right: 2rem; */
`

const EmptyPostListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`