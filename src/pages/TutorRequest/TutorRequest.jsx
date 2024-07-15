import {
  Alert,
  Button,
  Image,
  Popconfirm,
  Space,
  Table,
  notification,
} from 'antd'
import {
  approveUpTutorRequest,
  getTutorRequest,
  rejectUpTutorRequest,
} from '../../services/apis/user-manager.service'
import { SpinLoading } from '../../components/SpinLoading'
import useSWR from 'swr'

const TutorRequest = () => {
  const [api, contextHolder] = notification.useNotification()

  const fetchTutorRequest = async () => {
    const response = await getTutorRequest()
    return response
  }

  const {
    data: tutorRequest,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getTutorRequest', fetchTutorRequest)

  const handleUpRoleTutor = async (id) => {
    try {
      await approveUpTutorRequest({ accountId: id })
      api.success({
        message: 'Approved up role successful',
        type: 'success',
      })
      mutate()
    } catch (error) {
      api.error({
        message: error.message,
        type: 'error',
      })
    }
  }

  const handleRejectUpRoleTutor = async (id) => {
    try {
      await rejectUpTutorRequest({ accountId: id })
      api.success({
        message: 'Rejected successful',
        type: 'success',
      })
      mutate()
    } catch (error) {
      api.error({
        message: error.message,
        type: 'error',
      })
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

  if (error) {
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
