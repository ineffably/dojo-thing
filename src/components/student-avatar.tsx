import { Space, Typography } from 'antd'
import { Image } from 'antd'

export interface StudentAvatarProps {
  student: string;
  studentAvatar: string;
  classroom: string;
}

export const StudentAvatar = ({ student, studentAvatar, classroom }: StudentAvatarProps) => {
  return (
    <div>
      <Image src={studentAvatar} alt={student} style={{ width: '50px' }} />
      <Space style={{ verticalAlign: 'middle' }}>
        <Typography.Title level={5}>{student}</Typography.Title>
      </Space>
    </div>
  )
}
