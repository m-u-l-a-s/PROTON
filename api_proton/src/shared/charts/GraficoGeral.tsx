import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid } from '@mui/material';


type GraficoValores = {
  pendentes: number;
  concluidas: number;
  emAprovacao: number;
  atrasadas: number;
  aVencer: number;
};


const GraficoGeral: React.FC<{ valores: GraficoValores }> = ({ valores }) => {
  return (
    <Grid sx={{ alignItems: 'center', background: "#B5F8FD", borderRadius: 3, marginLeft:27}}>
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: valores.concluidas, label: 'Concluídas', color:"#5DC474" }, 
            { id: 1, value: valores.pendentes, label: 'Pendentes', color:"#FFD15C" },
            { id: 2, value: valores.emAprovacao, label: 'Em aprovação', color:"#00C1EA" },
            { id: 3, value: valores.atrasadas, label: 'Atrasadas', color:"#FF3D1D" },
            { id: 4, value: valores.aVencer, label: 'A Vencer', color:"#9747FF"}
          ],
        },
      ]}
      width={650}
      height={220}
      sx={{
        marginLeft: -26,
        marginTop: 3,
        marginBottom: 4, // Reduz a margem inferior
        padding: 0,
        alignItems:'flex-end', 
        '& text': {
          fontSize: '1.3em',
          fontFamily: 'Poppins',
        },
      }}
    />
     </Grid>
  
  );
};

export default GraficoGeral;
