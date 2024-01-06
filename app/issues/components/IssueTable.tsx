import { Link, StatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import NextLink from 'next/link'

const COLUMNS = [
  { label: 'Issue', key: 'title' },
  { label: 'Status', key: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', key: 'createdAt', className: 'hidden md:table-cell' },
]

export const COLUMN_KEYS = COLUMNS.map((column) => column.key)

export type IssueTableSearchParams = {
  status: Status
  orderBy: string
  page: string
}

interface Props {
  issues: Issue[]
  searchParams: IssueTableSearchParams
}
const IssueTable = ({ issues, searchParams }: Props) => {
  const tableColumns = COLUMNS.map((column) => (
    <Table.ColumnHeaderCell key={column.key} className={column.className}>
      <Flex align="center">
        <NextLink
          href={{
            query: {
              ...searchParams,
              orderBy: column.key,
            },
          }}
        >
          {column.label}
        </NextLink>
        {column.key === searchParams.orderBy && <ArrowUpIcon />}
      </Flex>
    </Table.ColumnHeaderCell>
  ))

  return (
    <Table.Root>
      <Table.Header>{tableColumns}</Table.Header>
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
  )
}

export default IssueTable
