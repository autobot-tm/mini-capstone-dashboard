import './styles.scss'
import { Space, Input, Form, Button, Typography, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthSlice } from '../../store/slices.js/auth.slice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const SignIn = () => {
  const navigation = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()
  const { actions: authActions } = useAuthSlice()
  const { loading, error, token } = useSelector((state) => state.auth)

  const onFinish = (values) => {
    console.log(values)
    const { email, password } = values
    dispatch(authActions.signIn({ email, password }))
  }
  useEffect(() => {
    if (error) {
      const errorMessage = error?.response?.data
      api.error({
        type: 'error',
        message: errorMessage,
      })
      dispatch(authActions.clearError())
    }
  }, [api, error])

  useEffect(() => {
    if (token) {
      navigation('/')
    }
  }, [token])
  return (
    <>
      {contextHolder}
      <div className='container-signIn'>
        <div className='container-signIn-inner'>
          <Title level={2} className='container-signIn-inner-title'>
            Sign In
          </Title>
          <Space direction='vertical'>
            <Form onFinish={onFinish} className='container-signIn-inner-form'>
              <Form.Item
                name='email'
                type={'email'}
                className='input'
                rules={[
                  {
                    required: true,
                    message: 'Email is required',
                  },
                  {
                    type: 'email',
                    message: 'Invalid email',
                  },
                ]}
              >
                <Input placeholder='Email' name='' required />
              </Form.Item>
              <Form.Item
                type={'password'}
                name='password'
                className='input'
                rules={[
                  {
                    required: true,
                    message: 'Password is required',
                  },
                ]}
              >
                <Input.Password placeholder='Password' required />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={loading}
                  disabled={loading}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </div>
    </>
  )
}

export default SignIn
