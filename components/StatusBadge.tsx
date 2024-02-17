import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import classNames from 'classnames'
import React from 'react'

interface StatusBadgeProps {
  status: Status
}

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { color: 'red', label: 'Open' },
  IN_PROGRESS: { color: 'violet', label: 'In Progress' },
  CLOSED: { color: 'green', label: 'Closed' },
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default StatusBadge
