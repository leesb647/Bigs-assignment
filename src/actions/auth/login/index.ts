'use server'

import { LoginResponse } from "@/schemas/auth"
import { ActionResult } from "../../action-result"

export const login = async (
  username: string,
  password: string,
): Promise<ActionResult<LoginResponse>> => {
  try {
    const { validated, status, error } = validateLoginForm(username, password)
    if (!validated) {
      return {
        status: status,
        error: error,
      }
    }
    
    const url = `https://front-mission.bigs.or.kr/auth/signin`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://front-mission.bigs.or.kr/auth/signin',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ username, password})
    })

    if (response.status === 200) {
      const result = await response.json()
      
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

const validateLoginForm = (
  username: string,
  password: string,
): {
  validated: boolean,
  status: 'error',
  error: string,
} => {
  if (!username) {
    return {
      validated: false,
      status: 'error',
      error: '이메일을 입력해주세요/'
    }
  }
  if (!password) {
    return {
      validated: false,
      status: 'error',
      error: '비밀번호를 입력해주세요/'
    }
  }
  
  return {
    validated: true,
    status: 'error',
    error: 'error',
  }
}