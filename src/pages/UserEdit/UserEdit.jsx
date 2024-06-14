import { Button, Card, Form, Input, notification } from 'antd'
import './styles.scss'
import { useState } from 'react'
import { PhoneNumberRegex } from '../../constants/user.constant'
import { updateUserService } from '../../services/apis/user.service'

const UserEdit = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const alert = ({ message, description, type }) => {
    api.open({
      message,
      description,
      duration: 3,
      type,
    })
  }

  const handleFinish = async (values) => {
    setIsLoading(true)
    try {
      const { fullname, phone } = values
      await updateUserService({
        fullname,
        phone,
      })
      alert({
        message: 'Success',
        description: 'Updated Successful!',
        type: 'success',
      })
    } catch (error) {
      alert({
        message: 'error',
        description: 'Updated Error',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='updateUserInfo'>
        <Card className='customCard' title='Edit Info'>
          <div>
            <Form layout='vertical' onFinish={handleFinish} form={form}>
              <Form.Item
                label='Full name'
                name='fullname'
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name',
                  },
                ]}
              >
                <Input placeholder='Enter your full name' />
              </Form.Item>
              <Form.Item
                label='Phone number'
                name='phone'
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(PhoneNumberRegex, 'g'),
                    message: 'Please input your phone number',
                  },
                ]}
              >
                <Input placeholder='Enter your phone number' />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserEdit
