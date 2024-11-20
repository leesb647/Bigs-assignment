import { login } from "@/actions/auth/login"
import { refreshToken } from "@/actions/auth/refresh-token"
import { signup } from "@/actions/auth/signup"
import { makeAutoObservable } from "mobx"

export interface AuthData {
  username: string
  password: string
  name: string
  confirmPassword: string
}

export type Form = 'signup' | 'login'

export class AuthStore {
  authData = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  }
  form = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  changeField(value: string, key: 'username' | 'password' | 'name' | 'confirmPassword', form: Form) {
    this.authData[key] = value
    this.form = form
  }

  initiateFields() {
    this.authData.username = ''
    this.authData.name = ''
    this.authData.password = ''
    this.authData.confirmPassword = ''
  }

  async getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  async getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  async saveTokens(accessToken: string, refreshToken: string) {
    await localStorage.setItem('accessToken', accessToken)
    await localStorage.setItem('refreshToken', refreshToken)
  }

  async registerUser({ username, name, password, confirmPassword}: AuthData) {
    if (username != undefined && password !== undefined && name != undefined && confirmPassword != undefined) {
      return await signup(username, name, password, confirmPassword)
    }
  }

  async loginUser(username: string, password: string) {
    return await login(username, password)
  }

  async refreshAccessToken(refrestToken: string) {
    return await refreshToken(refrestToken)
  }
  
}
