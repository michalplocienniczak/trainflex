'use client'
import { TimePicker, TimePickerProps, Form, FormItemProps } from 'antd'
import AppTimePickerFormik from './AppTimePickerFormik'
import React from 'react'

type AppTimePickerProps = TimePickerProps & {
  name?: string
  labelProps?: FormItemProps
}

const AppTimePicker = ({
  name,
  labelProps,
  ...inputProps
}: AppTimePickerProps) => {
  const field = name ? (
    <AppTimePickerFormik name={name} {...inputProps} />
  ) : (
    <TimePicker {...inputProps} />
  )

  return <Form.Item {...labelProps}>{field}</Form.Item>
}

export default AppTimePicker
