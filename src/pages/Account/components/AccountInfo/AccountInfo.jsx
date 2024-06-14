import { useSelector } from 'react-redux'
import CustomModal from '../../../../components/CustomModal/CustomModal'
import { closeAccountInfoModal } from '../../../../store/slices/modal.slice'
import './styles.scss'
import { useEffect, useState } from 'react'
import { getInfoUser } from '../../../../services/apis/user-manager.service'
import { SpinLoading } from '../../../../components/SpinLoading'
import { Paragraph } from '../../../../components/Typography/Paragraph/Paragraph'

const AccountInfo = () => {
  const { accountInfoModal, propsModal } = useSelector((state) => state.modal)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [account, setAccount] = useState({})
  const fecthInfoAccount = async () => {
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
      fecthInfoAccount()
    }
  }, [accountInfoModal])
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
      <Paragraph classNames='d-block'>
        <b>ID:</b> {account.id}
      </Paragraph>
      <Paragraph classNames='d-block'>
        <b>Email:</b> {account.email}
      </Paragraph>
      <Paragraph classNames='d-block'>
        <b>Fullname:</b> {account.fullname || 'N/A'}
      </Paragraph>
      <Paragraph classNames='d-block'>
        <b>Phone:</b> {account.phone || '-'}
      </Paragraph>
      <Paragraph classNames='d-block'>
        <b>Role:</b> {account.role}
      </Paragraph>
      <Paragraph classNames='d-block'>
        <b>Enabled:</b> {account.enabled ? 'Activated' : 'Deactivated'}
      </Paragraph>
    </CustomModal>
  )
}

export default AccountInfo
