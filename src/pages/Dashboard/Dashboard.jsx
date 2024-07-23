import { Alert, Col, Row } from 'antd'
import DoughnutChart from './components/DoughnutChart/DoughnutChart'
import LineChart from './components/LineChart/LineChart'
import SummaryCard from './components/SummaryCard/SummaryCard'
import './styles.scss'
import { Caption } from '../../components/Typography/Caption/Caption'
// import moment from 'moment'
import {
  getDashboard,
  getListTransaction,
} from '../../services/apis/dashboard.service'
import useSWR from 'swr'
import { SpinLoading } from '../../components/SpinLoading'
import PieChart from './components/PieChart/PieChart'
import {
  DollarOutlined,
  InboxOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
import { formatCustomCurrency } from '../../utils/number-seperator'
import TransactionTable from './components/TransactionTable/TransactionTable'

// const { RangePicker } = DatePicker

const Dashboard = () => {
  const fetchDashboard = async () => {
    const response = await getDashboard()
    response.moneyByDays.sort((a, b) => new Date(a.day) - new Date(b.day))
    return response
  }

  const fetchTransaction = async () => {
    const response = await getListTransaction()
    return response
  }

  const { data, error, isLoading } = useSWR('/api/charts', fetchDashboard)

  const {
    data: transactions,
    error: errorTrans,
    isLoading: isLoadingTrans,
  } = useSWR('/api/transaction', fetchTransaction)
  console.log('transactions', transactions)
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
            title='Total Accounts'
            value={data?.totalAccounts}
            icon={<TeamOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          <SummaryCard
            title='Total Monthly Package Transactions'
            value={data?.transactionCounts?.monthlyPackageTransactions}
            icon={<InboxOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          <SummaryCard
            title='Total Transactions'
            value={data?.transactionCounts?.totalTransactions}
            icon={<TransactionOutlined style={{ fontSize: 44 }} />}
          />
        </Col>
        <Col xs={24} lg={6}>
          {
            <SummaryCard
              title='Total Revenue'
              value={formatCustomCurrency(data?.totalRechargedMoney)}
              icon={<DollarOutlined style={{ fontSize: 44 }} />}
            />
          }
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify='center' className='chart-container'>
        <Col xs={16} className='item'>
          <figure>
            <LineChart data={data?.moneyByDays} />
            <Caption>Money by Days</Caption>
          </figure>
          {isLoadingTrans && <SpinLoading />}
          {errorTrans && 'Error fetch transactions'}
          <TransactionTable data={transactions} />
        </Col>
        <Col xs={8} className='item'>
          <figure>
            <DoughnutChart data={data?.rolePercentages} />
            <Caption>Role Percentages</Caption>
          </figure>
          <figure style={{ marginTop: 30 }}>
            <PieChart data={data?.tutorPaymentStatus} />
            <Caption>Tutor Payment Status</Caption>
          </figure>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
