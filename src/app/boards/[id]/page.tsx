'use client'

import { use } from "react";
import { PostViewer } from "./components/post-viewer";
import { useBoard } from "./hooks/use-board";

export interface PostPageProps {
  params: Promise<{ id: number}>
}

const mockPostData = {
  id: 999991,
  title: "게시된 게시물을 보기 위한 예제 게시물 입니다.2",
  boardCategory: "NOTICE",
  createdAt: "2024-11-11T09:29:45.721114",
  content: "저장된 데이터가 없습니다."
}

export default function PostDetailPage ({ params }: PostPageProps) {
  const { id } = use(params)

  const { data } = useBoard(id)
  // const data = null

  // if (!data) return <div>Loading...</div>
  
  if (data === undefined){
    return (
      <div>
        <PostViewer
          id={mockPostData.id}
          title={mockPostData.title}
          createdAt={mockPostData.createdAt}
          content={mockPostData.content}
          boardCategory={mockPostData.boardCategory}
        />
      </div>
    )
  }
  return (
    <div>
      <PostViewer
        id={data.id}
        title={data.title}
        createdAt={data.createdAt}
        content={data.content}
        boardCategory={data.boardCategory}
      />
    </div>
  )
}

