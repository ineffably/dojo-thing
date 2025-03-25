import { Card, Typography } from 'antd'
import { DojoTable } from './dojo-table'
import { CalendarHeatmap } from './e-charts'
import { AppContext } from './state-provider';
import { useContext, useEffect } from 'react';

export const DojoReports = () => {
  const { state } = useContext(AppContext);
  const { dojoData } = state;
  if(!dojoData) return null;
  
  const { activity, lookupFilters } = dojoData;

  return (
    <Card key="card" title={<Typography.Title level={4}>Data Graphs</Typography.Title>} >
      <>
        <div style={{ width: '50vw', height: '160px', marginBottom: '20px' }}>
          <CalendarHeatmap data={Object.entries(activity.dayCounts).map(([key, value]) => [key, value])} />
        </div>
        <DojoTable awardsData={state.awardsData || []} lookupFilters={lookupFilters} />
      </>
    </Card>
  )
}