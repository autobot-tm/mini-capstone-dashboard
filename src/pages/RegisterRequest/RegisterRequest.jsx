import './styles.scss'
import {
  Alert,
  Button,
  Divider,
  Image,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from 'antd'
import { useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading'
import ReactPlayer from 'react-player'
import {
  approveRegisterRequest,
  getAllRegisterRequest,
  rejectRegisterRequest,
} from '../../services/apis/subject.service'
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable'
import { TEACHINGSLOTS, WEEKDAYS } from '../../utils/time-slot'
import useSWR from 'swr'
import { SpinLoading } from '../../components/SpinLoading'

const RegisterRequest = () => {
  const [open, setOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const fetchPendingRegister = async () => {
    const response = await getAllRegisterRequest()
    return response
  }

  const {
    data: registers,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getRegisterRequest', fetchPendingRegister)

  const handleCancel = () => {
    setOpen(false)
  }

  const handleConfirmOk = async () => {
    setOpen(false)
    console.log(selectedRecord.id)
    try {
      await approveRegisterRequest({ accountId: selectedRecord.id })
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirmCancel = async () => {
    setOpen(false)
    console.log(selectedRecord.id)
    try {
      await rejectRegisterRequest({ accountId: selectedRecord.id })
      mutate()
    } catch (error) {
      console.log(error)
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

    const {
      fullname,
      email,
      phone,
      educationLevel,
      brief,
      subjects,
      grades,
      locations,
      tutorCertificates,
      tutorVideos,
      scheduleRecords,
    } = selectedRecord

    const columnService = [
      {
        title: 'Field',
        dataIndex: 'field',
        key: 'field',
        className: 'field-column',
      },
      {
        title: 'Information',
        dataIndex: 'info',
        key: 'info',
      },
    ]

    const data = [
      {
        key: '1',
        field: 'Name',
        info: fullname || 'N/A',
      },
      {
        key: '2',
        field: 'Email',
        info: email || 'N/A',
      },
      {
        key: '3',
        field: 'Phone',
        info: phone || 'N/A',
      },
      {
        key: '4',
        field: 'Education Level',
        info: educationLevel ? educationLevel.educationLevel : 'N/A',
      },
      {
        key: '5',
        field: 'Description',
        info: brief || 'N/A',
      },
      {
        key: '6',
        field: 'Subject',
        info: subjects.map((subject) => (
          <Tag key={subject.id}>{subject.name}</Tag>
        )),
      },
      {
        key: '7',
        field: 'Grade',
        info: grades.map((grade) => <Tag key={grade.id}>{grade.grade}</Tag>),
      },
      {
        key: '8',
        field: 'Location',
        info: locations.map((location) => (
          <Tag key={location.id}>{location.location}</Tag>
        )),
      },
      {
        key: '9',
        field: 'Certificate',
        info: <Image src={tutorCertificates[0]?.url} /> || 'N/A',
      },
      {
        key: '10',
        field: 'Video',
        info: (
          <div className='video-container'>
            {tutorVideos.map((video, index) => (
              <ReactPlayer
                key={index}
                controls={true}
                width='100%'
                height='100%'
                url={video.url}
              />
            ))}
          </div>
        ),
      },
      {
        key: '11',
        field: 'Available Schedule',
        info: (
          <ScheduleTable
            initialSchedule={scheduleRecords}
            weekDays={WEEKDAYS}
            teachingSlots={TEACHINGSLOTS}
          />
        ),
      },
    ]
    return (
      <Table
        columns={columnService}
        dataSource={data}
        pagination={false}
        showHeader={false}
        rowKey='key'
        bordered
      />
    )
  }

  if (isLoading) {
    return <SpinLoading />
  }

  if (error) {
    return (
      <Alert
        message='Error'
        description='Failed to fetch register request.'
        type='error'
        showIcon
      />
    )
  }
  return (
    <>
      <Table columns={columns} dataSource={registers} rowKey='id' />
      <Modal
        title={<SubHeading>Register Request</SubHeading>}
        centered
        visible={open}
        onCancel={() => handleCancel()}
        width={1000}
        footer={[
          <Popconfirm
            key='popconfirm-cancel'
            title='Are you sure to reject?'
            onConfirm={handleConfirmCancel}
            okText='Ok'
            cancelText='No'
          >
            <Button danger>Reject</Button>
          </Popconfirm>,
          <Popconfirm
            key='popconfirm-ok'
            title='Are you sure to approve?'
            onConfirm={handleConfirmOk}
            okText='Ok'
            cancelText='No'
          >
            <Button type='primary'>Approve</Button>
          </Popconfirm>,
        ]}
      >
        <Divider />
        {renderService()}
      </Modal>
    </>
  )
}

export default RegisterRequest
