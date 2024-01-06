'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  issue: Issue
}

const AssigneeSelect = ({ issue }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <Skeleton width="3" />

  if (error) return null

  const handleSelect = (value: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: value,
      })
      .catch(() => toast.error('Failed to assign issue'))
  }

  const renderedUsersList = users?.map((user) => (
    <Select.Item key={user.id} value={user.id}>
      {user.name}
    </Select.Item>
  ))

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={handleSelect}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {renderedUsersList}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
