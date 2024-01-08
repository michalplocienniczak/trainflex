import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import authOptions from '../auth/authOptions'
import Pagination from '../components/Pagination'
import IssueTable, {
  COLUMN_KEYS,
  IssueTableSearchParams,
} from './components/IssueTable'
import IssuesToolbar from './components/IssuesToolbar'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueTableSearchParams
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1
  const pageSize = 10
  const isValidStatus = Object.values(Status).includes(searchParams.status)

  const status = isValidStatus ? searchParams.status : undefined

  const orderBy = COLUMN_KEYS.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
    : undefined

  const where = {
    status,
  }

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * 10,
    take: pageSize,
  })

  const count = await prisma.issue.count({
    where,
  })
  const session = await getServerSession(authOptions)

  return (
    <div>
      {session && <IssuesToolbar />}
      <IssueTable issues={issues} searchParams={searchParams} />
      <Flex justify="center" className="p-4">
        <Pagination currentPage={page} pageSize={pageSize} itemCount={count} />
      </Flex>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issues List',
  description: 'View all project issues.',
}

export default IssuesPage
