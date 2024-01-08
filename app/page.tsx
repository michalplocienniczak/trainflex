import { Flex, Grid } from '@radix-ui/themes'
import { IssueChart, IssueSummary, LatestIssues } from './components'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Metadata } from 'next'

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: Status.OPEN,
    },
  })
  const closed = await prisma.issue.count({
    where: {
      status: Status.CLOSED,
    },
  })
  const inProgress = await prisma.issue.count({
    where: {
      status: Status.IN_PROGRESS,
    },
  })

  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
      }}
      gap="3"
    >
      <Flex direction="column" gap="3">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues.',
}
