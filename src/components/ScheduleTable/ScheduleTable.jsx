import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { CheckOutlined, MinusOutlined } from '@ant-design/icons'

const ScheduleTable = ({ initialSchedule, weekDays, teachingSlots }) => {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    if (initialSchedule) {
      const formattedSchedule = initialSchedule.map((record) => ({
        weekDayIds: record.weekDay.id,
        teachingSlotIds: [record.teachingSlot.id],
      }))
      setSchedule(formattedSchedule)
    }
  }, [initialSchedule])

  const renderIcon = (weekDayId, slotId) => {
    const isScheduled = schedule.some(
      (day) =>
        day.weekDayIds === weekDayId && day.teachingSlotIds.includes(slotId)
    )
    return isScheduled ? (
      <CheckOutlined style={{ color: 'green' }} />
    ) : (
      <MinusOutlined />
    )
  }

  const columns = [
    {
      title: 'Time Slot',
      dataIndex: 'slot',
      key: 'slot',
      align: 'center',
      render: (_, record) =>
        teachingSlots.find((slot) => slot.id === record.slotId)?.time,
    },
    ...weekDays.map((day) => ({
      title: day.day,
      dataIndex: day.id,
      key: day.id,
      align: 'center',
      render: (_, record) => renderIcon(day.id, record.slotId),
    })),
  ]

  const dataSource = teachingSlots.map((slot) => ({
    key: slot.id,
    slotId: slot.id,
  }))

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey='slotId'
        bordered
      />
    </div>
  )
}

export default ScheduleTable
