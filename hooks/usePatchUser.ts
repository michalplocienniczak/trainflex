import { User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type UsePatchUser = {
  userId: string
  user: Partial<User>
  onSuccess?: () => void
}

const patchUser = async (props: UsePatchUser) => {
  const response = await axios.patch(
    `/api/users/id/${props.userId}`,
    props.user
  )

  if (response.status === 200) {
    props.onSuccess && props.onSuccess()
  }

  const data: User = response.data
  return data
}

export const usePatchUser = (userId: string) => {
  return useMutation({
    mutationKey: ['user', userId],
    mutationFn: patchUser,
  })
}
