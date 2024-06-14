import { Button, Card, Form, Input, notification } from 'antd'
import './styles.scss'
import { useState } from 'react'
import { PASSWORD_REGEX } from '../../constants/auth.constant'
import { changePasswordService } from '../../services/apis/auth.service'
const ChangePassword = () => {
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
    const { password } = values
    if (!password) return
    try {
      setIsLoading(true)
      await changePasswordService({
        password,
      })
      form.resetFields()
      alert({
        message: 'Success',
        description: 'Change Password Successful!',
        type: 'success',
      })
    } catch (error) {
      alert({
        message: 'Error',
        description: 'Error change password',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='changePassword'>
        <Card className='customCard' title='Change Password'>
          <div>
            <Form layout='vertical' onFinish={handleFinish} form={form}>
              <Form.Item
                name='password'
                label='New password'
                rules={[
                  { required: true, message: 'Please enter new password' },
                  {
                    pattern: PASSWORD_REGEX.MIN_LENGTH,
                    message: 'Password must be at least 8 characters',
                  },
                  {
                    pattern: PASSWORD_REGEX.LOWERCASE,
                    message:
                      'Password must contain at least one lowercase character',
                  },
                  {
                    pattern: PASSWORD_REGEX.UPPERCASE,
                    message:
                      'Password must contain at least one uppercase character',
                  },
                  {
                    pattern: PASSWORD_REGEX.SPECIAL_CHARACTER,
                    message:
                      'Password must contain at least one special character',
                  },
                  {
                    pattern: PASSWORD_REGEX.NUMBER,
                    message: 'Password must contain at least one digit',
                  },
                ]}
              >
                <Input.Password size='large' placeholder='Enter new password' />
              </Form.Item>
              <Form.Item
                name='repeatPassword'
                label='Repeat password'
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please enter repeat new password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Passwords don't match"))
                    },
                  }),
                ]}
              >
                <Input.Password
                  size='large'
                  placeholder='Enter repeat new password'
                />
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

export default ChangePassword
