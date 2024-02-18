'use client'

import Training from '@/app/components/Training/Training'
import { useUserData } from '@/hooks'
import { useCurrentTrainingData } from '@/hooks/Trainings'
import { useSession } from 'next-auth/react'
import React from 'react'
import { LandingPage } from './LandingPage'
import { Spin } from 'antd'

const CurrentTraining = () => {
  const { data: session, status } = useSession()

  const { data: userData } = useUserData({ email: session?.user?.email })

  const { data, isLoading, isError } = useCurrentTrainingData({
    groupId: userData?.groupId,
  })

  if (status === 'unauthenticated') return <LandingPage />
  if (isLoading || status === 'loading') return <Spin spinning={true} />

  if (!data || isError) return <div>No training found</div>

  return <Training training={data} />
}

export default CurrentTraining
