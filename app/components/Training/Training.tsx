'use client'

import { useUserData } from '@/hooks'
import { usePostActivity } from '@/hooks/Activites/usePostActivity'
import { Training } from '@/types/GeneratedTraining'
import {
  CheckOutlined,
  CloseOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { Activity, Training as TrainingType, User } from '@prisma/client'
import { Card, Collapse, Popconfirm, notification } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import PostActivityModal from './PostActivityModal'
import { VscFlame } from 'react-icons/vsc'

dayjs.extend(durationPlugin)

const Training = ({
  training,
  activities,
  refetch,
}: {
  training: Training
  activities?: (Activity & { user: User })[]
  refetch?: () => void
}) => {
  const [open, setOpen] = useState(false)
  const { data } = useSession()
  const { data: user } = useUserData({ email: data?.user?.email })

  const formatSet = (sets: number) => {
    return sets > 1 ? `${sets} sets` : `${sets} set`
  }

  const formatRepetitions = (repetitions: number) => {
    return repetitions > 1
      ? `${repetitions} repetitions`
      : `${repetitions} repetition`
  }

  const postActivity = usePostActivity(training.id)

  const authors = activities?.map((activity) => activity.userId)

  const isCompleted = authors?.includes(user?.id || '')

  return (
    <>
      <PostActivityModal
        open={open}
        setOpen={setOpen}
        loading={postActivity.status === 'pending'}
        onSubmit={(values: Partial<Activity>) => {
          postActivity.mutate({
            trainingId: training.id,
            activity: {
              ...values,
              userId: user?.id || '',
            },
            onSuccess: () => {
              notification.success({
                message: 'Activity Posted! Congratz!',
              })
              setOpen(false)
              refetch?.()
            },
          })
        }}
      />
      <div className="flex flex-col gap-2 w-full">
        <Card
          title="Today's Training!"
          actions={[
            <div
              key="join"
              className={classNames({
                'cursor-pointer text-green-600': !isCompleted,
                'cursor-default text-zinc-500': isCompleted,
              })}
              onClick={() => !isCompleted && setOpen(true)}
            >
              <CheckOutlined className="mr-2" />
              Complete
            </div>,
            <Popconfirm
              key="dismiss"
              title="Are you sure you want to miss such an occasion?"
              okText="Unfortunatly, yes"
              cancelText="No, I'll do it"
              disabled={isCompleted}
              onConfirm={() => {
                postActivity.mutate({
                  trainingId: training.id,
                  activity: {
                    dismissed: true,
                    userId: user?.id || '',
                  },
                  onSuccess: () => {
                    notification.info({
                      message: 'Training Dismissed :(',
                    })
                  },
                })
              }}
            >
              <div
                className={classNames({
                  'cursor-pointer text-red-600': !isCompleted,
                  'cursor-default text-zinc-500': isCompleted,
                })}
              >
                <CloseOutlined className="mr-2" />
                Dismiss
              </div>
            </Popconfirm>,
          ]}
        >
          <h3 className="font-bold text-xl pb-3">{training.name}</h3>
          <div className="text-zinc-500 flex gap-2 text-md  pb-3">
            <FieldTimeOutlined />{' '}
            {dayjs
              .duration(training.duration * 60 * 1000)
              .format('m [minutes]')}
          </div>
          <p className="pb-3">{training.description}</p>
          <Collapse
            ghost
            items={[
              {
                key: '1',
                label: 'Workout Plan',
                children: (
                  <ul className="flex flex-col gap-2">
                    {training.exercises?.map((exercise) => (
                      <li key={exercise.name}>
                        <Card>
                          <h4 className="font-bold">{exercise.name}</h4>
                          <p className="text-zinc-500">
                            {dayjs
                              .duration(exercise.duration * 60 * 1000)
                              .format('m [minutes]')}{' '}
                            {exercise.repetitions * exercise.sets > 1 &&
                              ` | ${formatSet(
                                exercise.sets
                              )} x ${formatRepetitions(exercise.repetitions)}`}
                          </p>
                          <p>{exercise.description}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </Card>
        {activities?.map((activity) => (
          <Card key={activity.id}>
            {activity.dismissed ? (
              <div>
                <h4 className="font-bold">{activity.user.name}</h4>
                <p className="text-red-600">
                  <CloseOutlined className="mr-2" />
                  Dismissed a training :(
                </p>
              </div>
            ) : (
              <>
                <h4 className="font-bold">{activity.user.name}</h4>
                <div className="text-zinc-500 flex gap-2 text-md  pb-3">
                  <VscFlame />
                  {activity.burntCalories} kcal
                </div>
                <p className="pb-3">{activity.comment}</p>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  )
}

export default Training
