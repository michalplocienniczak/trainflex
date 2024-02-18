import { Button, Modal, Spin } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { AppForm, AppInput, AppInputNumber, AppTimePicker } from '..'
import { Activity } from '@prisma/client'
import { isEqual } from 'lodash'

type PostActivityModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  loading: boolean
  onSubmit: (values: Partial<Activity>) => void
}

const PostActivityModal = ({
  open,
  setOpen,
  loading,
  onSubmit,
}: PostActivityModalProps) => {
  const initialValues = {
    burntCalories: 0,
    comment: '',
  }

  return (
    <Modal
      title="Congratz!"
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Spin spinning={loading}>
          <AppForm layout="vertical">
            <AppInputNumber
              name="burntCalories"
              labelProps={{
                label: 'How many calories did you burn? (kcal)',
              }}
            />
            <AppInput
              name="comment"
              labelProps={{
                label: 'Share your thoughts!',
              }}
            />
            <Button type="primary" htmlType="submit" loading={loading}>
              Post your activity!
            </Button>
          </AppForm>
        </Spin>
      </Formik>
    </Modal>
  )
}

export default PostActivityModal
