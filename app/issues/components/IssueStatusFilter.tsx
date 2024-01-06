'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

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

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const status = searchParams.get('status') || 'all'
  const activeStatus = Object.values({ ...Status, all: 'all' }).includes(status)
    ? status
    : 'all'

  const handleSelect = (value: string) => {
    if (status) {
      params.delete('status')
      params.append('status', value)
    }
    if (value === 'all') params.delete('status')
    router.push('/issues/?' + params.toString())
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
