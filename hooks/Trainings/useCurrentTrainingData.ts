'use client'
import { Training } from '@/types/GeneratedTraining'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type UseCurrentTrainingDataProps = {
  groupId?: string | null
}

export const useCurrentTrainingData = (props: UseCurrentTrainingDataProps) => {
  return useQuery({
    queryKey: ['training', props.groupId],
    queryFn: async () => {
      const response = await axios.get(`/api/trainings/groups/${props.groupId}`)
      const data: Training = await response.data
      return data
    },
    retry: false,
    staleTime: Infinity,
    enabled: !!props.groupId,
  })
}
