'use server'

import { LoginResponse } from "@/schemas/auth"
import { ActionResult } from "../../action-result"

export const refreshToken = async (
  refreshToken: string
): Promise<ActionResult<LoginResponse>> => {
  try {
    const url = `https://front-mission.bigs.or.kr/auth/refresh`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://front-mission.bigs.or.kr/auth/refresh',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ refreshToken })
    })

    const result = await response.json()

    if (response.status === 200) {
      return {
        status: 'success',
        data: result
      }
    }
    return {
      status: 'error',
      error: '에러가 발생했습니다',
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      error: '에러가 발생했습니다.',
    }
  }
}
