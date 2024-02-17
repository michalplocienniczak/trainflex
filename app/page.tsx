import { Grid } from '@radix-ui/themes'
import { Metadata } from 'next'

export default async function Home() {
  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
      }}
      gap="3"
    ></Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues.',
}
