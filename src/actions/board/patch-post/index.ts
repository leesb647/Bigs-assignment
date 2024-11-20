'use server'

import axios from 'axios'
import { PostBoardResponseSchema } from "@/schemas/board"
import { ActionResult } from "../../action-result"

export interface PostBoardProps {
  accessToken: string
  id: number
  title: string
  content: string
  category: string
}

export const patchPost =
  async ({ accessToken, id, title, content, category }: PostBoardProps)
  : Promise<ActionResult<null>> => {
  try {
    if (!title) {
      return {
        status: 'error',
        error: '제목을 입력해주세요.'
      }
    }
    
    const baseUrl = 'https://front-mission.bigs.or.kr'
    const url = `${baseUrl}/boards/${id}`

    const response = await axios.patch(url, JSON.stringify({ title, content, category }), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': url,
        'Access-Control-Allow-Credentials': 'true',
      }
    })

    if (response.status === 200) {
      console.log('success')
      return {
        status: 'success',
        data: null,
      }
    } 
    else {
      console.log('error')
      return {
        status: 'error',
        error: '에러가 발생했습니다.'
      }
    }
  } catch (error) {
    console.log('catch')
    console.log(error)
    return {
      status: 'error',
      error: '에러가 발생했습니다.'
    }
  }
}
