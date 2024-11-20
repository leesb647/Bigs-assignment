import { useStores } from "@/store/context"
import { useCallback, useEffect } from "react"
import Editor from "./editor"
import { observer } from "mobx-react"

export const EditorContainer = observer(() => {
  const { boardStore: {
    board,
    changeField,
    initialize,
  } } = useStores()

  const onChangeField = useCallback((value: string, key: 'content' | 'title' | 'category') => changeField(value, key))

  useEffect(() => {
    return () => {
      initialize()
    }
  }, [])

  return (
    <Editor
      onChangeField={onChangeField}
      title={board.title}
      content={board.content}
    />
  )
})

export default EditorContainer