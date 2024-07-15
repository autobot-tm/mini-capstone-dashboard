import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Alert,
  Input,
  Tag,
} from 'antd'
import {
  deleteUsers,
  getUsers,
  restoreUsers,
} from '../../services/apis/user-manager.service'
import { SpinLoading } from '../../components/SpinLoading'
import {
  QuestionCircleOutlined,
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { openAccountInfoModal } from '../../store/slices/modal.slice'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'

const Account = () => {
  const { role } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const fetchUsers = async () => {
    const response = await getUsers()
    return response
  }

  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getUsers', fetchUsers)

  const handleInfo = (id) => {
    dispatch(openAccountInfoModal(id))
  }
  const handleDelete = async (id) => {
    try {
      await deleteUsers({ id })
      message.success('User deleted successfully')
      mutate()
    } catch (error) {
      message.error('Failed to delete user')
    }
  }

  const handleRestore = async (id) => {
    try {
      await restoreUsers({ id })
      message.success('User restored successfully')
      mutate()
    } catch (error) {
      message.error('Failed to restored user')
    }
  }

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
  }

  const handleReset = (clearFilters) => {
    clearFilters()
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    render: (text) => text || 'N/A',
  })
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
      render: (text) => text || 'N/A',
      ...getColumnSearchProps('email'),
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
      render: (text) => text || 'N/A',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'deleted',
      key: 'deleted',
      render: (enabled) =>
        enabled ? (
          <Tag color='magenta'>Deactivated</Tag>
        ) : (
          <Tag color='blue'>Activated</Tag>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size='middle'>
          {record?.deleted ? (
            <Popconfirm
              title='Are you sure to restore this user?'
              onConfirm={() => handleRestore(record.id)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary' icon={<UndoOutlined />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure to delete this user?'
              onConfirm={() => handleDelete(record.id)}
              okText='Yes'
              cancelText='No'
            >
              <Button danger>Disable</Button>
            </Popconfirm>
          )}
          <i
            style={{ cursor: 'pointer' }}
            onClick={() => handleInfo(record.id)}
          >
            <QuestionCircleOutlined style={{ fontSize: 20 }} />
          </i>
        </Space>
      ),
    },
  ]

  if (role !== 'ADMIN') {
    return 'Your role can not access!'
  }

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

  return <Table columns={columns} dataSource={users} rowKey='id' />
}

export default Account
