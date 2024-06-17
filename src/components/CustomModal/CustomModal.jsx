import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import './styles.scss'
import { SubHeading } from '../Typography/SubHeading/SubHeading'

const CustomModal = ({
  children,
  nameOfModal,
  title,
  action,
  width,
  footer,
}) => {
  const dispatch = useDispatch()
  return (
    <Modal
      width={width}
      destroyOnClose
      centered
      className='modal'
      title={
        <SubHeading size={230} strong classNames='title'>
          {title}
        </SubHeading>
      }
      open={nameOfModal}
      onOk={() => {
        dispatch(action())
      }}
      onCancel={() => {
        dispatch(action())
      }}
      footer={footer}
    >
      <div className='container'>{children}</div>
    </Modal>
  )
}

export default CustomModal
