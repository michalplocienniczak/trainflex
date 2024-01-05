import { Link, Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { StatusBadge } from '@/app/components'
import IssuesToolbar from './components/IssuesToolbar'
import { getServerSession } from 'next-auth'
import authOptions from '../auth/authOptions'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()
  const session = await getServerSession(authOptions)

  return (
    <div>
      {session && <IssuesToolbar />}
      <Table.Root>
        <Table.Header>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toISOString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
