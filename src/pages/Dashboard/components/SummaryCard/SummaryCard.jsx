import { Card } from 'antd'
import { Caption } from '../../../../components/Typography/Caption/Caption'
import { Headline } from '../../../../components/Typography/Headline/Headline'

const SummaryCard = ({ title, value, icon }) => {
  return (
    <Card id='container-card'>
      <div>
        <Headline classNames='d-block primary-color' size={360} strong>
          {value}
        </Headline>
        <Caption size={140}>{title}</Caption>
      </div>
      {icon}
    </Card>
  )
}

export default SummaryCard
