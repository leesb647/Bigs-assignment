import { parseAsInteger, useQueryState } from 'nuqs'

export const useBoardSearchParams = () => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(0).withOptions({
      history: 'push',
    })
  )
  const [size, setSize] = useQueryState(
    'size',
    parseAsInteger.withDefault(10).withOptions({
      history: 'push',
    })
  )

  return {
    page,
    setPage,
    size,
    setSize,
  }
}
