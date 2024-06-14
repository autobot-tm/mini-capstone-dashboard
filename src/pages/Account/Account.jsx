import { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message, Alert } from 'antd'
import { deleteUsers, getUsers } from '../../services/apis/user-manager.service'
import { SpinLoading } from '../../components/SpinLoading'
import { QuestionCircleOutlined } from '@ant-design/icons'

const Account = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await getUsers()
      console.log(response)
      setUsers(response.data)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  const handleInfo = (id) => {
    console.log(id)
  }
  const handleDelete = async (id) => {
    console.log('Delete user with id:', id)
    try {
      const rs = await deleteUsers({ id })
      console.log(rs)
      message.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      console.log(error)
      message.error('Failed to delete user')
    }
  }

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (enabled ? 'Enabled' : 'Disabled'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size='middle'>
          <Popconfirm
            title='Are you sure to delete this user?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <i onClick={() => handleInfo(record.id)}>
            <QuestionCircleOutlined />
          </i>
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

  return <Table columns={columns} dataSource={users} rowKey='id' />
}

export default Account
