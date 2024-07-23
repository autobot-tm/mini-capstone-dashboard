import { Table } from 'antd'
import { formatCustomCurrency } from '../../../../utils/number-seperator'

const TransactionTable = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (text) =>
        text === 'MONTHLY_PACKAGE' ? 'Monthly Package' : 'Recharge',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (text ? formatCustomCurrency(text) : 'N/A'),
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
  ]

  return (
    <div className='transaction-table'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        pagination={false}
        scroll={{ y: 240 }}
      />
    </div>
  )
}

export default TransactionTable
