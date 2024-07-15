import { useState } from 'react'
import {
  approveComplaintService,
  getAllComplaintService,
  rejectComplaintService,
} from '../../services/apis/complaint.service'
import { Alert, Button, Divider, Modal, Space, Table, Tag } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading'
import { SpinLoading } from '../../components/SpinLoading'
import useSWR from 'swr'

const Complaint = () => {
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [open, setOpen] = useState(false)
  const [filteredInfo, setFilteredInfo] = useState({})

  const fetchComplaints = async () => {
    const response = await getAllComplaintService()
    return response
  }

  const {
    data: complaints,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getComplaints', fetchComplaints)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'tutorEmail',
      key: 'tutorEmail',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'PENDING', value: 'PENDING' },
        { text: 'APPROVED', value: 'APPROVED' },
        { text: 'REJECTED', value: 'REJECTED' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag
          color={
            status === 'PENDING'
              ? 'orange'
              : status === 'APPROVED'
              ? 'green'
              : 'default'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size='middle'>
          <i onClick={() => handleClick(record)}>
            <InfoCircleOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </i>
        </Space>
      ),
    },
  ]

  const handleClick = (record) => {
    setSelectedRecord(record)
    setOpen(true)
  }

  const renderService = () => {
    if (!selectedRecord) return null

    const { content, tutorEmail, status, createdAt, id } = selectedRecord

    const columnService = [
      {
        title: 'Field',
        dataIndex: 'field',
        key: 'field',
        className: 'field-column',
      },
      {
        title: 'Info',
        dataIndex: 'info',
        key: 'info',
        render: (text, record) =>
          record.field === 'Status' ? (
            <Tag
              color={
                text === 'PENDING'
                  ? 'orange'
                  : text === 'APPROVED'
                  ? 'green'
                  : 'default'
              }
            >
              {text}
            </Tag>
          ) : (
            text
          ),
      },
    ]

    const data = [
      {
        key: '1',
        field: 'Tutor Email',
        info: tutorEmail || 'N/A',
      },
      {
        key: '2',
        field: 'Description',
        info: content || 'N/A',
      },
      {
        key: '3',
        field: 'Status',
        info: status || 'N/A',
      },
      {
        key: '4',
        field: 'Date',
        info: createdAt,
      },
    ]

    const approveComplaint = async () => {
      try {
        await approveComplaintService({ id })
        mutate()
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    }

    const rejectComplaint = async () => {
      try {
        await rejectComplaintService({ id })
        mutate()
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <>
        <Table
          columns={columnService}
          dataSource={data}
          pagination={false}
          showHeader={false}
          rowKey='key'
          bordered
          style={{ width: '100%' }}
        />
        {status === 'PENDING' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: 16,
            }}
          >
            <Space>
              <Button onClick={approveComplaint} type='primary'>
                Approve
              </Button>
              <Button onClick={rejectComplaint} type='default'>
                Reject
              </Button>
            </Space>
          </div>
        )}
      </>
    )
  }

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters)
  }

  if (isLoading) {
    return <SpinLoading />
  }

  if (error) {
    return (
      <Alert
        message='Error'
        description='Failed to fetch complaints.'
        type='error'
        showIcon
      />
    )
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={complaints}
        rowKey='id'
        onChange={handleChange}
      />
      <Modal
        title={<SubHeading>Complaint</SubHeading>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
        footer=''
      >
        <Divider />
        {renderService()}
      </Modal>
    </>
  )
}

export default Complaint
