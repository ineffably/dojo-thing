import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Space, Typography, Tooltip, Badge } from 'antd';
import { useContext, useState } from 'react';
import { Link } from 'wouter';
import { AppContext } from './state-provider';
import { sortBy } from '../library/data-utils';

export const ClassCard = ({ classroom, awards }) => {
  const { state } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);

  const Extra = () => (
    <Button
      size='small'
      icon={collapsed ? <PlusOutlined /> : <MinusOutlined />}
      onClick={() => { setCollapsed(!collapsed) }}
    />
  )

  const averageEntropy = Math.floor(awards.weights / Object.keys(awards.students).length)

  return (
    <Card
      key={classroom}
      className="awards-card"
      title={
        <Space>
          <Typography.Text key={'classroom'}>{classroom}</Typography.Text>
          <Tooltip title="Average Awards">
            <Badge count={averageEntropy} showZero color={(averageEntropy > 0 ? 'green' : 'red')} />
          </Tooltip>
        </Space>
      }
      extra={
        <Space>
          <Typography.Text>{Object.keys(awards.students).length} students</Typography.Text>
          <Extra />
        </Space>
      }
      size="small"
    >
      <div key={'class-cards'} className="class-card">
        {!collapsed && (Object.entries((awards.students as any)) as any).map(([student, entry], index) => {
          const { awardValue, avatar, id } = entry;
          const sortedBehaviors = Object.values(state.studentBehaviors[student].behaviors).sort(sortBy('count', true));
          const behaviors = sortedBehaviors.slice(0, 2).map(({ behavior, count }) => <div key={behavior}>{(count + '').padStart(2, '0')} | {behavior}</div>)
          return (
            <div key={index} className="student-awards-entry">
              <Tooltip key="tooltip" title={<div>{student}:<br /> {behaviors}</div>}>
                <Link href={`/student/${student}`} style={{ color: '#338' }}>
                  <Space>
                    <img src={avatar} alt={student} style={{ width: '30px' }} />
                    {student}
                  </Space>
                </Link>
              </Tooltip>
              <Space key="space">
                <Typography.Text style={{ fontWeight: 'bold' }}>{awardValue}</Typography.Text>
              </Space>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
