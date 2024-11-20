import { z } from 'zod'

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>
