import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  open: number
  closed: number
  inProgress: number
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statuses = [
    {
      label: 'Open issues',
      value: open,
      status: Status.OPEN,
    },
    {
      label: 'In Progress issues',
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    {
      label: 'Closed issues',
      value: closed,
      status: Status.CLOSED,
    },
  ]

  return (
    <Flex gap="3" justify="between">
      {statuses.map((status) => (
        <Card key={status.label} className="w-full">
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/?status=${status.status}`}
              className="text-xs text-zinc-500"
            >
              {status.label}
            </Link>
            <Text size="6">{status.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
