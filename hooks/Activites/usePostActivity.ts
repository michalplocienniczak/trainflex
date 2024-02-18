import { Activity } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type UsePostActivity = {
  trainingId: string
  activity: Partial<Activity> & { userId: string }
  onSuccess?: () => void
}

const postActivity = async (props: UsePostActivity) => {
  const response = await axios.post(
    `/api/trainings/${props.trainingId}/activities`,
    props.activity
  )

  if (response.status === 200) {
    props.onSuccess && props.onSuccess()
  }

  const data: Activity = response.data
  return data
}

export const usePostActivity = (trainingId: string) => {
  return useMutation({
    mutationKey: ['activity', trainingId],
    mutationFn: postActivity,
  })
}
