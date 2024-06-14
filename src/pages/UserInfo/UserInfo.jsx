import { Button, Card, Col, Row, Typography } from 'antd'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getInfoUser } from '../../services/apis/user-manager.service'
import { SpinLoading } from '../../components/SpinLoading'
import { routeNames } from '../../config'
const { Title, Paragraph } = Typography
const UserInfo = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { id, fullname, phone, role, email } = useSelector(
    (state) => state.auth.user
  )
  const fetchUserInfo = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await getInfoUser({ id })
      setUser(response)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (id) {
      fetchUserInfo()
    }
  }, [])
  if (isLoading) {
    return <SpinLoading />
  }

  if (isError) {
    return 'Failed to fecth info'
  }

  return (
    <div className='userInfo'>
      <Card className='customCard' title='My Info'>
        <div className='userInfoContainer'>
          <div className='topPart'>
            <div>
              <Title level={3}>
                {user?.fullname ? user?.fullname : fullname}
              </Title>
              <Paragraph style={{ margin: 0 }}>{email ? email : ''}</Paragraph>
            </div>
          </div>
          <div className='bottomPart'>
            <Paragraph>
              <strong>Role</strong>: {role}
            </Paragraph>
            <Paragraph>
              <strong>Phone</strong>: {user?.phone ? user?.phone : phone}
            </Paragraph>
            <Row gutter={[12, 12]} className='actionContainer'>
              <Col sm={24} md={8}>
                <Button
                  size='large'
                  className='actionButton'
                  onClick={() => navigate(routeNames.UserEdit)}
                >
                  Edit
                </Button>
              </Col>
              <Col sm={24} md={16}>
                <Button
                  size='large'
                  className='actionButton'
                  onClick={() => navigate(routeNames.ChangePassword)}
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserInfo
