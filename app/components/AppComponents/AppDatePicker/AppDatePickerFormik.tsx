'use client'
import { DatePicker, DatePickerProps } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

type AppDatePickerFormikProps = DatePickerProps & {
  name: string
}

const AppDatePickerFormik = ({
  name,
  ...inputProps
}: AppDatePickerFormikProps) => {
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
    <DatePicker
      {...inputProps}
      value={dayjs(get(values, name))}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

export default AppDatePickerFormik
