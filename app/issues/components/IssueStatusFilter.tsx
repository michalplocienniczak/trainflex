'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const STATUSES = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Open',
    value: Status.OPEN,
  },
  {
    label: 'In Progress',
    value: Status.IN_PROGRESS,
  },
  {
    label: 'Closed',
    value: Status.CLOSED,
  },
]

interface Props {
  activeStatus: Status | 'all'
}

const IssueStatusFilter = ({ activeStatus }: Props) => {
  const router = useRouter()

  const handleSelect = (value: string) => {
    value !== 'all'
      ? router.push('/issues/?status=' + value)
      : router.push('/issues/')
  }

  const renderStatusOptions = STATUSES.map((status) => (
    <Select.Item key={status.value} value={status.value}>
      {status.label}
    </Select.Item>
  ))

  return (
    <Select.Root onValueChange={handleSelect} defaultValue={activeStatus}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>{renderStatusOptions}</Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
