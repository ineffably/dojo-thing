import { Table } from 'antd'
import { Award } from '../types/dojo-types';
import { LookupFilters } from '../types/app-types';

interface DojoTableProps {
  awardsData: Award[];
  lookupFilters: LookupFilters;
}

export const DojoTable = ({ awardsData, lookupFilters }: DojoTableProps) => {

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: 'date',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: 'behavior',
    dataIndex: 'behavior',
    key: 'behavior',
    filters: Object.keys(lookupFilters.behaviors).map((behavior) => ({ text: behavior, value: behavior })),
    onFilter: (value: string, record: any) => record.behavior.indexOf(value) === 0
  }, {
    title: 'classroom',
    dataIndex: 'classroom',
    key: 'classroom',
    filters: Object.keys(lookupFilters.classrooms).map((classroom) => ({ text: classroom, value: classroom })),
    onFilter: (value: string, record: any) => record.classroom.indexOf(value) === 0
  }, {
    title: 'student',
    dataIndex: 'student',
    key: 'student',
    filters: Object.keys(lookupFilters.students).map((student) => ({ text: student, value: student })),
    onFilter: (value: string, record: any) => record.student.indexOf(value) === 0
  }, {
    title: 'weight',
    dataIndex: 'weight',
    key: 'weight'
  }]

  return (
    <Table
      rowKey={(record) => record.id}
      key="table"
      dataSource={awardsData} 
      columns={columns} 
    />
  )
}