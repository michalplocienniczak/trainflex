import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'
import { Status } from '@prisma/client'

interface Props {
  activeStatus: Status | 'all'
}

const IssuesToolbar = async ({ activeStatus }: Props) => {
  return (
    <Flex justify="between" align="center">
      <IssueStatusFilter activeStatus={activeStatus} />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssuesToolbar
