import {memo} from "react";
import * as echarts from "echarts/core";
import {
  BarChart,
  LineChart,
  PieChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";
import type { EChartsOption } from "echarts";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
]);

interface ChartsProps {
  option: EChartsOption;
  height?: number | string;
  width?: number | string;
}

const Charts = ({ option }: ChartsProps) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
       style={{
          height: '100%',
          width: '95%',
          minHeight: '300px',
        }}
    />
  );
};

export default memo(Charts);
 