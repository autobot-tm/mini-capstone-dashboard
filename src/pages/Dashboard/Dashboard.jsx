import { Alert, Col, Row } from 'antd'
import DoughnutChart from './components/DoughnutChart/DoughnutChart'
import LineChart from './components/LineChart/LineChart'
import SummaryCard from './components/SummaryCard/SummaryCard'
import './styles.scss'
import { Caption } from '../../components/Typography/Caption/Caption'
// import moment from 'moment'
import { getDashboard } from '../../services/apis/dashboard.service'
import useSWR from 'swr'
import { SpinLoading } from '../../components/SpinLoading'
import PieChart from './components/PieChart/PieChart'
import {
  DollarOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
import { formatCustomCurrency } from '../../utils/number-seperator'

// const { RangePicker } = DatePicker

const Dashboard = () => {
  const fetchDashboard = async () => {
    const response = await getDashboard()
    response.moneyByDays.sort((a, b) => new Date(a.day) - new Date(b.day))
    return response
  }

  const { data, error, isLoading } = useSWR('/api/charts', fetchDashboard)

  if (isLoading) {
    return <SpinLoading />
  }

  if (error) {
    return (
      <Alert
        message='Error'
        description='Failed to fetch data.'
        type='error'
        showIcon
      />
    )
  }

  return (
    <div className='dashboard-container'>
      <Row gutter={[16, 16]} justify='center'>
        <Col xs={24} lg={6}>
          <SummaryCard
            title='Total Users'
            value={
              data.rolePercentages[3].count + data.rolePercentages[2].count
            }
            icon={<TeamOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          <SummaryCard
            title='Total Tutor Payment'
            value={data.tutorPaymentStatus[0].count}
            icon={<TeamOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          <SummaryCard
            title='Transactions'
            value={123}
            icon={<TransactionOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          {
            <SummaryCard
              title='Total Revenue'
              value={formatCustomCurrency(2000000)}
              icon={<DollarOutlined style={{ fontSize: 44 }} />}
            />
          }
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify='center' className='chart-container'>
        <Col xs={12} className='item'>
          <figure>
            <LineChart data={data.moneyByDays} />
            <Caption>Money by Days</Caption>
          </figure>
        </Col>
        <Col xs={12} className='item'>
          <figure>
            <DoughnutChart data={data.rolePercentages} />
            <Caption>Role Percentages</Caption>
          </figure>
          <figure style={{ marginTop: 30 }}>
            <PieChart data={data.tutorPaymentStatus} />
            <Caption>Tutor Payment Status</Caption>
          </figure>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
