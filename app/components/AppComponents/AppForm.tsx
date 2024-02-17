'use client'
import React from 'react'
import { Form as AntdForm, FormProps } from 'antd'
import { Form } from 'formik'

type AppFormProps = React.PropsWithChildren & FormProps

const AppForm = ({ children, ...formProps }: AppFormProps) => {
  return (
    <AntdForm {...formProps} component="div">
      <Form>{children}</Form>
    </AntdForm>
  )
}

export default AppForm
