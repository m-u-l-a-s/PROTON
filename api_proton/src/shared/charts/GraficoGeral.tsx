import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


type GraficoValores = {
  pendentes: number;
  concluidas: number;
  emAprovacao: number;
  atrasadas: number;
  aVencer: number;
};


const GraficoGeral: React.FC<{ valores: GraficoValores }> = ({ valores }) => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: valores.concluidas, label: 'Concluídas' },
            { id: 1, value: valores.pendentes, label: 'Pendentes' },
            { id: 2, value: valores.emAprovacao, label: 'Em aprovação' },
            { id: 3, value: valores.atrasadas, label: 'Atrasadas' },
            { id: 4, value: valores.aVencer, label: 'A Vencer'}
          ],
        },
      ]}
      width={600}
      height={220}
      sx={{ marginLeft: -35, marginTop: 1.5, marginBottom:1.5, padding: "0", alignItems:'flex-end'}}
    />
  
  );
};

export default GraficoGeral;
