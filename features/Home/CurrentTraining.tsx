'use client'

import Training from '@/app/components/Training/Training'
import { useUserData } from '@/hooks'
import { useCurrentTrainingData } from '@/hooks/Trainings'
import { useSession } from 'next-auth/react'
import React from 'react'

const CurrentTraining = () => {
  const { data: session } = useSession()

  const { data: userData } = useUserData({ email: session?.user?.email })

  const { data, isLoading } = useCurrentTrainingData({
    groupId: userData?.groupId,
  })

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No training found</div>

  return <Training training={data} />
}

export default CurrentTraining
