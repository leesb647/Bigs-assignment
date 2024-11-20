'use server'

import { GetPostListResponseSchema } from "@/schemas/board"
import { ActionResult } from "../../action-result"
import axios from "axios"

export interface GetPostsProps {
  accessToken: string,
  limit: number,
  skip: number,
}

export const getPosts =
  async ({ accessToken, limit, skip }: GetPostsProps)
  : Promise<ActionResult<GetPostListResponseSchema>> => {
  try {
    const params = new URLSearchParams({
      page: (limit * skip).toString(),
      size: limit.toString(),
      select: 'id',
    })
    const baseUrl = `https://front-mission.bigs.or.kr/boards`
    const url = `${baseUrl}?${params.toString()}`
    
    const response = await axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': url,
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Bearer ${accessToken}`
      },
    })

    if (response.status === 200) {
      return {
        status: 'success',
        data: response.data,
      }
    } else {
      console.log('getPosts failed')
      return {
        status: 'error',
        error: '에러가 발생했습니다.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      error: '에러가 발생했습니다.'
    }
  }
}
