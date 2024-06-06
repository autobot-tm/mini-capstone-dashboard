import { Layout, Menu } from 'antd'
import './styles.scss'
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons'
const { Sider } = Layout
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const menuItems = [
  {
    icon: <DashboardOutlined />,
    path: '/',
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    icon: <HomeOutlined />,
    path: '/tutor',
    label: 'Tutor',
    key: 'tutor',
  },
]
const MainSidebar = () => {
  return (
    <Sider breakpoint='lg' collapsedWidth='0' className='container-sider'>
      <Logo />
      <MenuSidebar />
    </Sider>
  )
}

const Logo = () => {
  return (
    <Link to={'/'} className='container-logo'>
      LOGO
    </Link>
  )
}
const MenuSidebar = () => {
  const location = useLocation()
  const getSelectedKeys = (pathname) => {
    const currentMenuItem = menuItems.find(({ path }) =>
      pathname.includes(path)
    )
    return currentMenuItem ? [currentMenuItem.key] : []
  }
  const selectedKeys = getSelectedKeys(location.pathname)
  return (
    <div className='container-menu'>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        activeKey={selectedKeys}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}
export default MainSidebar
