import MainHeader from './components/MainHeader/MainHeader'
import MainSidebar from './components/MainSidebar/MainSidebar'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import './styles.scss'
import { Helmet } from 'react-helmet'
const { Content, Footer } = Layout

const MainLayout = () => {
  return (
    <>
      <Helmet>
        <title>Dash Board</title>
      </Helmet>
      <Layout className='container-layout'>
        <MainSidebar />
        <Layout>
          <MainHeader />
          <Content className='container-content-layout'>
            <div className='content-layout'>
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Tutor ©2024 Created by On Demand Tutor
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MainLayout
