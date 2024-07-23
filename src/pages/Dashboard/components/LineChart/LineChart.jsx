import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const LineChart = ({ data }) => {
  const chartData = useMemo(() => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: 'Total Money',
          data: data.map((item) => item.total),
          fill: false,
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
          pointStyle: 'circle',
          pointRadius: 5,
        },
      ],
    }
  }, [data])

  return <Line data={chartData} />
}

export default LineChart
