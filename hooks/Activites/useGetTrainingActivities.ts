'use client'
import { Activity, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type UseGetTrainingActivitiesProps = {
  trainingId: string
}

export const useGetTrainingActivities = (
  props: UseGetTrainingActivitiesProps
) => {
  return useQuery({
    queryKey: ['activities', props.trainingId],
    queryFn: async () => {
      const response = await fetch(
        `/api/trainings/${props.trainingId}/activities`
      )
      const data: (Activity & { user: User })[] = await response.json()
      return data
    },
    enabled: !!props.trainingId,
  })
}
