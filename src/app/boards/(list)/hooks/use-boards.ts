import { useQuery } from "@tanstack/react-query"
import { useBoardSearchParams } from "./use-board-search-params"
import { getPosts } from "@/actions/board/get-posts"
import { useStores } from "@/store/context"

export const useBoards = () => {
  const { page, size } = useBoardSearchParams()
  const { authStore: { getAccessToken }} = useStores()

  const props = {
    limit: size,
    skip: size * (page),
  }

  return useQuery({
    queryKey: ['boards', { ...props }],
    queryFn: async () => {
      const accessToken = await getAccessToken()
      if (accessToken !== null) {
        const res = await getPosts({ accessToken, ...props })
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