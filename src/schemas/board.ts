import { z } from 'zod'

export const postBoardResponseSchema = z.object({
  id: z.number(),
})

export type PostBoardResponseSchema = z.infer<typeof postBoardResponseSchema>

export const getPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  boardCategory: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
})

export type GetPostResponseSchema = z.infer<typeof getPostSchema>

export const getSubPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  createdAt: z.string(),
})

export type GetSubPostResponseSchema = z.infer<typeof getSubPostResponseSchema>

export const getSortResponseSchema = z.object({
  unsorted: z.boolean(),
  sorted: z.boolean(),
  empty: z.boolean(),
})

export type GetSortResponseSchema = z.infer<typeof getSortResponseSchema>

export const getPageableResponseSchema = z.object({
  pageNumber: z.number(),
  pageSize: z.number(),
  sort: getSortResponseSchema,
  offset: z.number(),
  unpaged: z.boolean(),
  paged: z.boolean(),
})

export type GetPageableResponseSchema = z.infer<typeof getPageableResponseSchema>

export const getPostListResponseSchema = z.object({
  content: z.array(getPostSchema),
  pageable: getPageableResponseSchema,
  totalPages: z.number(),
  totalElements: z.number(),
  last: z.boolean(),
  numberOfElements: z.number(),
  size: z.number(),
  number: z.number(),
  sort: getSortResponseSchema,
  first: z.boolean(),
  empty: z.boolean(),
})

export type GetPostListResponseSchema = z.infer<typeof getPostListResponseSchema>




