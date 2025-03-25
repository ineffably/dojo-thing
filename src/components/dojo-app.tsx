import { useState, useEffect, useContext } from 'react';
import { ClassCard } from './class-card';
import { AppContext } from './state-provider';
import { Route, Router } from "wouter";
import { StudentView } from './student-view';
import { useHashLocation } from "wouter/use-hash-location";
import { CalendarHeatmap } from './e-charts';
import { DojoTable } from './dojo-table';
import { Card, Typography } from 'antd';
import { CreateDojoData, service } from '../library/create-dojo-data';
import type { LookupFilters } from '../types/app-types';
import '../dojo-app.css';
import { Logo } from './logo';
import { DojoAPI } from '../types/dojo-types';
import { DojoReports } from './dojo-reports';

export const DojoApp = () => {
  const { state, dispatch } = useContext(AppContext);
  const [indexedByClassroom, setIndexedByClassroom] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    (async () => {
      const dojoJsonData = await ((await fetch(service)).json()) as DojoAPI;
      const dojoData = await CreateDojoData(dojoJsonData);
      const { awardsByClassroom, awardsByStudents, lookupFilters, awards, activity, studentBehaviors } = dojoData;

      dispatch({ type: 'SetDojoData', payload: { dojoData } });
      dispatch({ type: 'SetAwards', payload: { awardsData: awards } });
      dispatch({ type: 'SetByClassroom', payload: { awardsByClassroom } });
      dispatch({ type: 'SetByStudent', payload: { awardsByStudents } });
      dispatch({ type: 'SetStudentBehaviors', payload: { studentBehaviors } });

      setIndexedByClassroom(awardsByClassroom);
    })();
  }, [])

  if (!state.awardsByStudents) return <div>Loading...</div>;

  return (
    <Router hook={useHashLocation}>
      <Route path="/">
        <div className='page'>
          <Logo />

          {Object.entries(indexedByClassroom).map(([classroom, awards]) => (
            <ClassCard key={classroom} {...{ classroom, awards }} />
          ))}

          <DojoReports />

        </div>
      </Route>
      <Route path="/student/:student">
        {(params: any) => <StudentView student={params?.student} />}
      </Route>
    </Router>
  )
}
