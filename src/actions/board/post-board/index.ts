'use server'

import axios from 'axios'
import { PostBoardResponseSchema } from "@/schemas/board"
import { ActionResult } from "../../action-result"

export interface PostBoardProps {
  accessToken: string
  title: string
  content: string
  category: string
}

export const postBoard =
  async ({ accessToken, title, content, category }: PostBoardProps)
  : Promise<ActionResult<PostBoardResponseSchema>> => {
  try {
    const response = await axios.post('https://front-mission.bigs.or.kr/boards', JSON.stringify({ title, content, category }), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://front-mission.bigs.or.kr/boards',
        'Access-Control-Allow-Credentials': 'true',
      }
    })
    console.log(response)
    // // const result = await response.json()

    // // console.log(result)

    // if (response.ok) {
    //   console.log('success')
    //   return {
    //     status: 'success',
    //     data: {id:1},
    //   }
    // } 
    // else {
      console.log('error')
      return {
        status: 'error',
        error: '에러가 발생했습니다.'
      }
    // }
  } catch (error) {
    console.log('catch')
    console.log(error)
    return {
      status: 'error',
      error: '에러가 발생했습니다.'
    }
  }
}
