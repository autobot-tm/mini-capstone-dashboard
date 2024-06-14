import { Spin } from 'antd'

export const SpinLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Spin size='large' />
    </div>
  )
}
