import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider, {
  SendVerificationRequestParams,
} from 'next-auth/providers/email'
import prisma from '@/prisma/client'
import { NextAuthOptions } from 'next-auth'
import { MailerSend, EmailParams } from 'mailersend'

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider } = params
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  console.log('Sending email to:', identifier)

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_TOKEN as string,
  })

  const emailParams = new EmailParams()
    .setFrom({
      email: provider.from,
      name: 'TrainFlex',
    })
    .setTo([
      {
        email: identifier,
      },
    ])
    .setSubject('Sign in to TrainFlex')
    .setText(`Your link to sign in to TrainFlex: ${url}`)

  const resp = await mailerSend.email.send(emailParams)

  console.log('resp', resp)

  if (resp.statusCode > 299) {
    throw new Error(`Email(s) could not be sent`)
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: (params) => sendVerificationRequest(params),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
}

export default authOptions
