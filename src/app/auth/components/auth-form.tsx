'use client'

import Button from "@/components/styled-button"
import { useStores } from "@/store/context"
import { observer } from "mobx-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent } from "react"
import styled from "styled-components"

const titleMap = {
  login: '로그인',
  signup: '회원가입',
}

export interface AuthFormProps {
  type: 'login' | 'signup'
}

export const AuthForm = observer(({ type }: AuthFormProps) => {
  const title = titleMap[type]
  const { userStore, authStore } = useStores()
  const router = useRouter()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === 'name' || name === 'username' || name === 'password' || name === 'confirmPassword') {
      authStore.changeField(value, name, type)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, name, password, confirmPassword } = authStore.authData

    // 회원가입 시
    if (type === 'signup') {
      await signup(username, name, password, confirmPassword)
      //로그인 시
    } else if (type === 'login') {
      await login(username, password)
    }
  }

  const signup = async (username: string, name: string, password: string, confirmPassword: string) => {
    const result = await authStore.registerUser({username, name, password, confirmPassword})

    if (result !== undefined && result.status === 'success') {
      authStore.initiateFields()
      router.push('/auth/login')
    } else {
      // 실패시...
      console.log('error')
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const result = await authStore.loginUser(username, password)
      if (result !== undefined && result.status === 'success') {
        const { accessToken, refreshToken } = result.data
        await authStore.saveTokens(accessToken, refreshToken)
        await userStore.saveUserData({username, name: ''})

        authStore.initiateFields()
        router.push('/boards')
      } 
      else {
        // 실패시...
        console.log('error')
      }
    }catch (e) {
      console.log('로컬 스토리지가 잘 작동하지 않습니다.')
      console.log(e)
    }
  }

  return (
    <AuthFormContainer>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          type="email"
          value={authStore.authData.username}
          onChange={onChange}
        />
        {type === "signup" && (
          <StyledInput
            autoComplete="name"
            name="name"
            placeholder="이름"
            value={authStore.authData.name}
            onChange={onChange}
          />
        )}
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={authStore.authData.password}
        />
        {type === 'signup' && (
          <StyledInput
            autoComplete="new-password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
            value={authStore.authData.confirmPassword}
            onChange={onChange}
          />
        )}
        <Button
          $fullwidth
          $cyan
          style={{ marginTop: '1rem' }}
        >
          {titleMap[type]}
        </Button>
      </form>
      <Footer>
        {
          type === "signup"
            ? <Link href="/auth/login" onClick={authStore.initiateFields}>로그인</Link>
            : <Link href="/auth/signup" onClick={authStore.initiateFields}>회원가입</Link>
        }
      </Footer>
    </AuthFormContainer>
  )
})

const AuthFormContainer = styled.div`
  h3 {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
  }
`

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }

  & + & {
    margin-top: 1rem;
  }
`

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: gray;
    text-decoration: underline;
    &:hover {
      color: gray;
    }
  }
`