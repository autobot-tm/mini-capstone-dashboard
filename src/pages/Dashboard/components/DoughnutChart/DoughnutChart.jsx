import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.role),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  }

  return <Doughnut data={chartData} />
}

export default DoughnutChart
