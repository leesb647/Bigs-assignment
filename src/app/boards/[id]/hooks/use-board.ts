import { useQuery } from "@tanstack/react-query"
import { useStores } from "@/store/context"
import { getPost } from "@/actions/board/get-post"

export const useBoard = (id: number) => {
  const { authStore: { getAccessToken }} = useStores()
  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const accessToken = await getAccessToken()
      if (accessToken !== null) {
        const res = await getPost({ accessToken, id })
        if (res.status === 'error') {
          throw new Error(res.error)
        }
        return {
          ...res.data
        }
      }
    }
  })
}