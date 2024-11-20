'use server'

import { ActionResult } from "../../action-result"

export const signup = async (
  username: string,
  name: string,
  password: string,
  confirmPassword: string
): Promise<ActionResult<undefined>> => {
  try {
    const { validated, status, error } = validateSignupForm(
      username,
      name,
      password,
      confirmPassword,
    )

    if (!validated) {
      return {
        status: status,
        error: error
      }
    }

    const url = `https://front-mission.bigs.or.kr/auth/signup`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://front-mission.bigs.or.kr/auth/signup',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ username, name, password, confirmPassword})
    })
    
    if (response.ok) {
      return {
        status: 'success',
        data: undefined,
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

const validateSignupForm = (
  username: string, 
  name: string, 
  password: string, 
  confirmPassword: string
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
  if (!name) {
    return {
      validated: false,
      status: 'error',
      error: '이름을 입력해주세요/'
    }
  }
  if (!password) {
    return {
      validated: false,
      status: 'error',
      error: '비밀번호를 입력해주세요/'
    }
  }
  if (!confirmPassword) {
    return {
      validated: false,
      status: 'error',
      error: '확인용 비밀번호를 입력해주세요/'
    }
  }
  if (password !== confirmPassword) {
    return {
      validated: false,
      status: 'error',
      error: '비밀번호가 같지 않습니다.'
    }
  }

  return {
    validated: true,
    status: 'error',
    error: 'error',
  }
}