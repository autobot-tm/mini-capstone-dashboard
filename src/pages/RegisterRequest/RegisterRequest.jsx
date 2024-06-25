import './styles.scss'
import { Divider, Modal, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import tutor from '../../mock/tutor.data.json'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading'
import ReactPlayer from 'react-player'

const RegisterRequest = () => {
  const [open, setOpen] = useState(false)
  const [idAccount, setIdAccount] = useState(null)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'tutor',
      key: 'tutor',
      render: (text) => text.fullname || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'tutor',
      key: 'tutor',
      render: (text) => text.phone || 'N/A',
    },
    {
      title: 'Education Level',
      dataIndex: 'tutor',
      key: 'tutor',
      render: (text) => text?.educationLevel || 'N/A',
    },
    {
      title: 'Rating',
      dataIndex: 'tutor',
      key: 'tutor',
      render: (text) => text?.rating || 'No rating',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size='middle'>
          <i
            onClick={() => {
              setIdAccount(record.id), setOpen(true)
            }}
          >
            <QuestionCircleOutlined />
          </i>
        </Space>
      ),
    },
  ]
  const renderService = () => {
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
        info: tutor[idAccount]?.tutor.fullname,
      },
      {
        key: '2',
        field: 'Email',
        info: tutor[idAccount]?.tutor.email || 'N/A',
      },
      {
        key: '3',
        field: 'Phone',
        info: tutor[idAccount]?.tutor.phone || 'N/A',
      },
      {
        key: '4',
        field: 'Education Level',
        info: tutor[idAccount]?.tutor.educationLevel || 'N/A',
      },
      {
        key: '5',
        field: 'Description',
        info: tutor[idAccount]?.description || 'N/A',
      },
      {
        key: '6',
        field: 'Subject',
        info: tutor[idAccount]?.name.map((item) => (
          <Tag key={item.id}>{item.subject}</Tag>
        )),
      },
      {
        key: '7',
        field: 'Grade',
        info: tutor[idAccount]?.grade || 'N/A',
      },
      {
        key: '8',
        field: 'Location',
        info: tutor[idAccount]?.location.map((item) => (
          <Tag key={item.id}>{item.name}</Tag>
        )),
      },
      {
        key: '9',
        field: 'Video',
        info: (
          <div className='video-container'>
            <ReactPlayer
              controls={true}
              width='100%'
              height='100%'
              url='https://firebasestorage.googleapis.com/v0/b/on-demand-tutor-b39e2.appspot.com/o/tutorVideo%2FCambly%20Tutor%20Introduction%20Video.mp45b6e4ec0-037c-4102-b3a0-0b73ec1d1e15?alt=media&token=b0cbba97-cd53-4b81-9198-d7c01596c89f'
            />
          </div>
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
  return (
    <>
      <Table columns={columns} dataSource={tutor} rowKey='id' />
      <Modal
        title={<SubHeading>Service</SubHeading>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
      >
        <Divider />
        {renderService()}
      </Modal>
    </>
  )
}

export default RegisterRequest
