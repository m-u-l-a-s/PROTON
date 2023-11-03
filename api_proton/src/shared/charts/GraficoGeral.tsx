import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


type GraficoValores = {
  pendentes: number;
  concluidas: number;
  emAprovacao: number;
  atrasadas: number;
};


const GraficoGeral: React.FC<{ valores: GraficoValores }> = ({ valores }) => {


  return (
  
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: valores.concluidas, label: 'Completas' },
            { id: 1, value: valores.pendentes, label: 'Pendentes' },
            { id: 2, value: valores.emAprovacao, label: 'A vencer' },
            { id: 3, value: valores.atrasadas, label: 'Atrasadas' },
          ],
        },
      ]}
      width={400}
      height={180}
      sx={{ marginLeft: -10, padding: "0.2rem" }}
    />
  
  );
};

export default GraficoGeral;
