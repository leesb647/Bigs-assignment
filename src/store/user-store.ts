import { action, makeObservable, observable } from "mobx"

export interface UserData {
  username: string
  name: string
}

export class UserStore {
  user = {
    username: '',
    name: '',
  }

  constructor() {
    makeObservable(this, { 
      user: observable,
      saveUserData: action,
      clearUserData: action,
    })
    this.user = {
      username: '',
      name: '',
    }
  }

  async saveUserData(user: UserData) {
    this.user.username = user.username
    this.user.name = user.name
    await localStorage.setItem('user', JSON.stringify({ username: user.username, name: user.name}))
  }

  async clearUserData() {
    this.user.username = ''
    this.user.name = ''
  }

  async tempSaveUserData({ username, name }:{ username: string, name: string | undefined}) {
    this.user.username = username
    if (name) {
      this.user.name = name
    }
    await localStorage.removeItem('user')
  }
}
