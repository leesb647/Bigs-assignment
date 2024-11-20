import { makeAutoObservable } from "mobx"

export interface Board {
  title: string
  content: string
  category: string
}

export class BoardStore {
  board: Board = {
    title: '',
    content: '',
    category: '',
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  changeField(value:string, key: 'title' | 'content' | 'category') {
    console.log(value)
    console.log(key)
    this.board[key] = value
  }

  initialize() {
    this.board.title = ''
    this.board.category = ''
    this.board.content = ''
  }

}
