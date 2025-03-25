import { Card, Typography, Space, Tooltip, List, Image } from 'antd';
import { type StudentCardProps } from './student-view';
import { StudentAvatar } from './student-avatar';
import { Link } from 'wouter';

export const StudentCard = ({ studentHistory, studentBehaviors }: StudentCardProps) => {
  if (!studentBehaviors?.behaviors) return <div>Loading...</div>;
  const { student, studentAvatar, classroom } = studentHistory[0];
  const datasource = Object.values(studentBehaviors.behaviors);

  return (
    <Card
      className={'awards-card'}
      title={<StudentAvatar {...{ student, studentAvatar, classroom }} />}
      extra={
        <Space>
          <Link href={`/`} >
          <Typography.Title level={5} type='secondary'>{classroom}</Typography.Title>
          </Link>
        </Space>
      }
    >
      <Card title={
        <Space>
          <Typography.Text>Awards Events</Typography.Text>
          <Tooltip title="Number of Award Events">
            <Typography.Text>({studentHistory.length})</Typography.Text>
          </Tooltip>
        </Space>

      } extra={
        <Space>
          <Typography.Text>{studentBehaviors.behaviorPoints} points</Typography.Text>
        </Space>
      }>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={datasource.sort((a: any, b: any) => b.reward - a.reward)}
          renderItem={({ behavior, count, reward }: any) => (
            <List.Item className='award-list-item'>
              <Space>
                <Tooltip title="Award Events">
                  <Typography.Text>{(count + '').padStart(3, '0')}</Typography.Text>
                </Tooltip>
                <Typography.Text>{behavior}</Typography.Text>
              </Space>
              <Space>
                <Typography.Text>{reward}</Typography.Text>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </Card>
  );
}