import { getCategories } from "@/actions/board/board-category"
import Dropdown from "@/components/dropdown"
import { useStores } from "@/store/context"
import { observer } from "mobx-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const EditorCategory = observer(() => {
  const { authStore, boardStore } = useStores()
  const [category, setCategory] = useState<string[]>([])
  const router = useRouter()
  
  useEffect(() => {
    async function loadCategory() {
      const accessToken = await authStore.getAccessToken()
      if (accessToken !== null) {
        const result = await getCategories(accessToken)
        console.log(result)
        if (result.status === 'success') {
          setCategory(([...Object.values(result.data)]))
        } else {
          router.push('/auth/login')
        }
      }
    }

    loadCategory()
  }, [])

  return (
    <Dropdown option={category} value={boardStore.board.category} changeField={boardStore.changeField}/>
  )
})

export default EditorCategory
