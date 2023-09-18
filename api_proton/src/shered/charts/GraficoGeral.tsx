import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Completo' },
            { id: 1, value: 15, label: 'Parciais' },
            { id: 2, value: 3, label: 'A vencer' },
            { id: 2, value: 20, label: 'Assinar' },
          ],
        },
      ]}
      width={400}
      height={180}
      sx={{marginLeft:-10}}
    />
  );
}