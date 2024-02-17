'use client'
import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type UseUserDataProps = {
  email?: string | null
}

export const useUserData = (props: UseUserDataProps) => {
  return useQuery({
    queryKey: ['user', props.email],
    queryFn: async () => {
      const response = await fetch(`/api/users/${props.email}`)
      const data: User = await response.json()
      return data
    },
  })
}
