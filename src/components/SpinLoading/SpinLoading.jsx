import { Spin } from 'antd'

export const SpinLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
      }}
    >
      <Spin size='large' />
    </div>
  )
}
