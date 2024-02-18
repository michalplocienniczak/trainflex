import { Training as TrainingType } from '@/types/GeneratedTraining'
import {
  CheckOutlined,
  CloseOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { Card, Collapse } from 'antd'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import React from 'react'

dayjs.extend(durationPlugin)

const Training = ({ training }: { training: TrainingType }) => {
  const formatSet = (sets: number) => {
    return sets > 1 ? `${sets} sets` : `${sets} set`
  }

  const formatRepetitions = (repetitions: number) => {
    return repetitions > 1
      ? `${repetitions} repetitions`
      : `${repetitions} repetition`
  }

  return (
    <Card
      title="Today's Training!"
      actions={[
        <div key="join" className="text-green-600">
          <CheckOutlined className="mr-2" />
          Complete
        </div>,
        <div key="dismiss" className="text-red-600">
          <CloseOutlined className="mr-2" />
          Dismiss
        </div>,
      ]}
    >
      <h3 className="font-bold text-xl pb-3">{training.name}</h3>
      <div className="text-zinc-500 flex gap-2 text-md  pb-3">
        <FieldTimeOutlined />{' '}
        {dayjs.duration(training.duration * 60 * 1000).format('m [minutes]')}
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
                          ` | ${formatSet(exercise.sets)} x ${formatRepetitions(
                            exercise.repetitions
                          )}`}
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
  )
}

export default Training
