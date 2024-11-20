'use server'

import { ActionResult } from "../../action-result"

export const getCategories =
  async (accessToken: string)
  : Promise<ActionResult<object>> => {
  try {
    const url = `https://front-mission.bigs.or.kr/boards/categories`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://front-mission.bigs.or.kr/boards/categories',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Bearer ${accessToken}`
      },
    })

    const result = await response.json()

    if (response.ok) {
      return {
        status: 'success',
        data: result,
      }
    } else {
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
