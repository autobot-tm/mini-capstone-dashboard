import { Button, Layout, Menu } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuthSlice } from '../../../../store/slices/auth.slice';
// import { userRoleMapper } from '../../../../utils/user';
// import { UserAuthMethod } from '../../../../constants/user.constant';
// import { getUserInfoFromToken } from '../../../../utils/auth';
const { Header } = Layout

const MainHeader = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch();
  // const { id_token } = useSelector(state => state.auth);
  // const { role, auth_method } = getUserInfoFromToken(id_token);
  // const { actions: authActions } = useAuthSlice();
  const onItemClick = (event) => {
    const { key } = event

    if (key === 'logout') {
      const confirmLogout = window.confirm('Do you want logout?')
      if (confirmLogout) {
        // dispatch(authActions.signOut());
      }
      return
    }
    navigate(key)
  }

  const items = [
    {
      key: 'SubMenu',
      label: (
        <Button
          type='text'
          icon={<UserOutlined />}
          size='large'
          style={{ color: 'white' }}
        >
          Role
        </Button>
      ),
      children: [
        {
          label: <span>Profile</span>,
          icon: <EyeOutlined />,
          key: '/user-info',
        },
        {
          label: <span>Edit User</span>,
          icon: <EditOutlined />,
          key: '/user-info/update',
        },
        {
          label: <span>Change Password</span>,
          icon: <LockOutlined />,
          key: '/auth/change-password',
          // disabled: auth_method !== UserAuthMethod.NORMAL,
        },
        {
          label: <span>Sign Out</span>,
          icon: <LogoutOutlined />,
          key: 'logout',
        },
      ],
    },
  ]
  return (
    <Header
      style={{
        padding: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          items={items}
          onClick={onItemClick}
          inlineCollapsed={false}
          disabledOverflow={true}
        />
      </div>
    </Header>
  )
}

export default MainHeader
