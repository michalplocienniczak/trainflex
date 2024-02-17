'use client'
import { Training } from '@/types/GeneratedTraining'
import { useQuery } from '@tanstack/react-query'

type UseCurrentTrainingDataProps = {
  groupId?: string | null
}

export const useCurrentTrainingData = (props: UseCurrentTrainingDataProps) => {
  return useQuery({
    queryKey: ['training', props.groupId],
    queryFn: async () => {
      const response = await fetch(`/api/trainings/groups/${props.groupId}`)
      const data: Training = await response.json()
      return data
    },
  })
}
