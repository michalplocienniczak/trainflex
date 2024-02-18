'use client'
import { TimePicker, TimePickerProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

type AppTimePickerFormikProps = TimePickerProps & {
  name: string
}

const AppTimePickerFormik = ({
  name,
  ...inputProps
}: AppTimePickerFormikProps) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<{
    [name: string]: string | Dayjs | undefined
  }>()

  const onChange = (dayjsVal: Dayjs | null) => {
    setFieldValue(name, dayjsVal?.format('YYYY-MM-DD') || '')
    inputProps?.onChange?.(
      dayjs(dayjsVal),
      dayjsVal?.format('YYYY-MM-DD') || ''
    )
  }
  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    setFieldTouched(name, true)
    inputProps?.onBlur?.(event, { range: 'start' })
  }

  return (
    <TimePicker
      {...inputProps}
      value={dayjs(get(values, name))}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

export default AppTimePickerFormik
