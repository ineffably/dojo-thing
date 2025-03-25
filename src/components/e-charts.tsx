import * as echarts from 'echarts/core';
import {
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);

import ReactEChartsCore from 'echarts-for-react/lib/core';
function getVirtualData(year) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 1000)
    ]);
  }
  return data;
}



// option && myChart.setOption(option);

export const CalendarHeatmap = ({ data = getVirtualData(2025), options = {} }) => {
  const option = {
    tooltip: {
      position: 'top'
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: 'top'
    },
    calendar: [
      {
        range: '2025',
        cellSize: ['auto', 20]
      }
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data
      }
    ],
    ...options
  };


  return (
    <ReactEChartsCore
      style={{ width: '100%', height: '100%' }}
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
      onChartReady={(ev) => {  }}
      // onEvents={EventsDict}
      // opts={}
   />

  )
}