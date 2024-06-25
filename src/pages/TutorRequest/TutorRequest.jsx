import {
  Alert,
  Button,
  Image,
  Popconfirm,
  Space,
  Table,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import {
  approveUpTutorRequest,
  getTutorRequest,
  rejectUpTutorRequest,
} from '../../services/apis/user-manager.service'
import { SpinLoading } from '../../components/SpinLoading'

const TutorRequest = () => {
  const [tutorRequest, setTutorRequest] = useState([])
  const [api, contextHolder] = notification.useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchTutorRequest = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await getTutorRequest()
      setTutorRequest(response)
      console.log(response)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchTutorRequest()
  }, [])

  const handleUpRoleTutor = async (id) => {
    setIsLoading(true)
    setIsError(false)
    try {
      await approveUpTutorRequest({ accountId: id })
      api.success({
        message: 'Approved up role successful',
        type: 'success',
      })
      fetchTutorRequest()
    } catch (error) {
      api.error({
        message: error.error,
        type: 'Error',
      })
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const handleRejectUpRoleTutor = async (id) => {
    setIsLoading(true)
    setIsError(false)
    try {
      await rejectUpTutorRequest({ accountId: id })
      api.success({
        message: 'Rejected successful',
        type: 'success',
      })
      fetchTutorRequest()
    } catch (error) {
      api.error({
        message: error.error,
        type: 'Error',
      })
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Certificate',
      dataIndex: 'tutorCertificates',
      key: 'certificate',
      render: (text, record) => (
        <Space size='middle'>
          <Image width={50} src={record?.tutorCertificates[0].url} />
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size='middle'>
          <Popconfirm
            title='Accept'
            description='Are you sure you want to upgrade this user to the Tutor role?'
            onConfirm={() => handleUpRoleTutor(record.id)}
            okText='Ok'
            cancelText='No'
          >
            <Button type='primary'>Approve</Button>
          </Popconfirm>
          <Popconfirm
            title='Reject'
            description='Are you sure you want to decline upgrading this user to the Tutor role?'
            onConfirm={() => handleRejectUpRoleTutor(record.id)}
            okText='Ok'
            cancelText='No'
          >
            <Button danger>Reject</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  if (isLoading) {
    return <SpinLoading />
  }

  if (isError) {
    return (
      <Alert
        message='Error'
        description='Failed to fetch users.'
        type='error'
        showIcon
      />
    )
  }

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={tutorRequest} rowKey='id' />
    </>
  )
}

export default TutorRequest
