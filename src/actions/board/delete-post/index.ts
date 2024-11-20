'use server'

import { ActionResult } from "../../action-result"
import axios from "axios"

export interface GetPostsProps {
  accessToken: string,
  id: number,
}

export const removePost =
  async ({ accessToken, id }: GetPostsProps)
  : Promise<ActionResult<null>> => {
  try {
    const baseUrl = `https://front-mission.bigs.or.kr`
    const url = `${baseUrl}/boards/${id}`
    
    const response = await axios.get(url, {
      method: 'DELETE',
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
        data: null,
      }
    } else {
      console.log('removePost failed')
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
