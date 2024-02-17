import { Training } from '@/types/GeneratedTraining'
import { CloseOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

const Training = ({ training }: { training: Training }) => {
  return (
    <Card
      actions={[
        <PlayCircleOutlined key="join" />,
        <CloseOutlined key="dismiss" />,
      ]}
    >
      <h3>{training.name}</h3>
      <p>{training.description}</p>
      <p>{training.duration}</p>
    </Card>
  )
}

export default Training
