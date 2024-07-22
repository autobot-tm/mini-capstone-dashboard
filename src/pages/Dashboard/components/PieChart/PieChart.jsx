import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => (item.status === 'paid' ? 'Paid' : 'Unpaid')),
    datasets: [
      {
        label: '# of Tutors',
        data: data.map((item) => item.count),
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  }

  return <Pie data={chartData} />
}

export default PieChart
