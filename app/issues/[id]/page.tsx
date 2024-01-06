import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { EditIssueButton, IssueDetails } from './components'
import DeleteIssueButton from './components/DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './components/AssigneeSelect'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  if (typeof params.id !== 'string') notFound()

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  })

  if (!issue) notFound()

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '5',
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={params.id} />
            <DeleteIssueButton issueId={params.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailPage
