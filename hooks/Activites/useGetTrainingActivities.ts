'use client'
import { Activity, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type UseGetTrainingActivitiesProps = {
  trainingId: string
}

export const useGetTrainingActivities = (
  props: UseGetTrainingActivitiesProps
) => {
  return useQuery({
    queryKey: ['activities', props.trainingId],
    queryFn: async () => {
      const response = await axios.get(
        `/api/trainings/${props.trainingId}/activities`
      )
      const data: (Activity & { user: User })[] = await response.data
      return data
    },
    enabled: !!props.trainingId,
  })
}
