'use client'

import { Formik } from 'formik'
import { DefaultOptionType } from 'antd/es/select'
import AppForm from '@/app/components/AppComponents/AppForm'
import AppInput from '@/app/components/AppComponents/AppInput/AppInput'
import AppSelect from '@/app/components/AppComponents/AppSelect/AppSelect'
import { isEqual } from 'lodash'
import { Button, Spin } from 'antd'
import { useUserData } from '@/hooks'
import { useSession } from 'next-auth/react'
import { usePatchUser } from '@/hooks/usePatchUser'

type ProfileFormProps = {
  groupOptions: DefaultOptionType[]
}

const ProfileForm = ({ groupOptions }: ProfileFormProps) => {
  const { data: session } = useSession()

  const { data, isLoading, refetch } = useUserData({
    email: session?.user?.email,
  })

  const patchUser = usePatchUser(data?.id || '')

  if (!data) return <Spin className="w-full" />

  const initialValues = {
    name: data?.name,
    email: data?.email,
    groupId: data?.groupId,
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const { email, ...rest } = values
        patchUser.mutate({
          userId: data.id,
          user: rest,
          onSuccess: () => {
            refetch()
          },
        })
      }}
      enableReinitialize
    >
      {({ values }) => {
        const hasntChanged = isEqual(values, initialValues)
        return (
          <Spin spinning={isLoading || patchUser.status === 'pending'}>
            <AppForm layout="vertical">
              <AppInput
                name="name"
                labelProps={{
                  label: 'Name',
                }}
              />
              <AppInput
                name="email"
                labelProps={{
                  label: 'Email',
                }}
                disabled
              />
              <AppSelect
                name="groupId"
                labelProps={{
                  label: 'Your fitness level group',
                }}
                options={groupOptions}
                style={{
                  height: 'auto',
                }}
              />
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasntChanged}
                loading={isLoading || patchUser.status === 'pending'}
              >
                Save
              </Button>
            </AppForm>
          </Spin>
        )
      }}
    </Formik>
  )
}

export default ProfileForm
