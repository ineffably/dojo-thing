import { useContext, useState } from 'react';
import { AppContext } from './state-provider';
import { Award } from '../types/dojo-types';
import { StudentCard } from './student-card';

export interface StudentCardProps {
  studentHistory: Award[];
  studentBehaviors: Record<string, any>;
}

export const StudentView = ({ student }) => {
  const { state } = useContext(AppContext);
  const [studentHistory] = useState(state.awardsByStudents[student]);
  const [studentBehaviors] = useState(state.studentBehaviors[student]);

  return (
    <div className='page'>
      <StudentCard {...{ studentHistory, studentBehaviors }} />
    </div>
  )
};