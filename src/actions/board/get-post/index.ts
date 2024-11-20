'use server'

import { GetPostResponseSchema } from "@/schemas/board"
import { ActionResult } from "../../action-result"
import axios from "axios"

export interface GetPostProps {
  accessToken: string
  id: number
}

export const getPost =
  async ({ accessToken, id }: GetPostProps)
  : Promise<ActionResult<GetPostResponseSchema>> => {
  try {
    const baseUrl = `https://front-mission.bigs.or.kr`
    const url = `${baseUrl}/boards/${id}`
    
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
    console.log('error')
    console.log(error)
    return {
      status: 'error',
      error: '에러가 발생했습니다.'
    }
  }
}
