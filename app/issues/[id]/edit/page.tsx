import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import IssueFormLoading from '../../components/IssueFormLoading'
import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('@/app/issues/components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormLoading />,
})

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}

export default EditIssuePage
