import { useSelector } from 'react-redux'
import CustomModal from '../../../../components/CustomModal/CustomModal'
import { closeAccountInfoModal } from '../../../../store/slices/modal.slice'
import './styles.scss'
import { useEffect, useState } from 'react'
import { getInfoUser } from '../../../../services/apis/user-manager.service'
import { SpinLoading } from '../../../../components/SpinLoading'
import { Table, Tag } from 'antd'

const AccountInfo = () => {
  const { accountInfoModal, propsModal } = useSelector((state) => state.modal)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [account, setAccount] = useState({})

  const fetchInfoAccount = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await getInfoUser({ id: propsModal })
      setAccount(response)
    } catch (error) {
      console.log('Error at fetch info account', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (accountInfoModal) {
      fetchInfoAccount()
    }
  }, [accountInfoModal])

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
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
      field: 'ID',
      info: account.id,
    },
    {
      key: '2',
      field: 'Email',
      info: account.email,
    },
    {
      key: '3',
      field: 'Fullname',
      info: account.fullname || 'N/A',
    },
    {
      key: '4',
      field: 'Phone',
      info: account.phone || '-',
    },
    {
      key: '5',
      field: 'Role',
      info: account.role,
    },
    {
      key: '6',
      field: 'Status',
      info: account.deleted ? (
        <Tag color='magenta'>Deactivated</Tag>
      ) : (
        <Tag color='blue'>Activated</Tag>
      ),
    },
  ]
  if (isLoading) {
    return <SpinLoading />
  }

  if (isError) {
    return 'ERROR FETCH INFO ACCOUNT'
  }
  return (
    <CustomModal
      width={400}
      nameOfModal={accountInfoModal}
      title='Information Account'
      action={closeAccountInfoModal}
      footer={null}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
        rowKey='key'
        bordered
      />
    </CustomModal>
  )
}

export default AccountInfo
