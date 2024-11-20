import { AuthStore } from "./auth-store"
import { BoardStore } from "./board"
import { UserStore } from "./user-store"

export class RootStore {
  userStore
  authStore
  boardStore

  constructor() {
    this.userStore = new UserStore()
    this.authStore = new AuthStore()
    this.boardStore = new BoardStore()
  }
}