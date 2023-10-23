import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { styled } from '@mui/system'; // Use o módulo @mui/system

const CustomDatePicker = styled(DatePicker)({
  '& input': {
    color: 'white', // Define a cor do texto como branca
    fontSize: '16px', // Define o tamanho da fonte do texto
  },
  '& .MuiSvgIcon-root': {
    fill: 'white', // Define a cor do ícone como branca
  },
});

interface CalendarioEtapaProps {
  dataBanco: string;
}

export function CalendarioEtapa({ dataBanco }: CalendarioEtapaProps) {
  const value = dayjs(dataBanco, "DD-MM-YYYY");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <CustomDatePicker
        value={value}
      />
    </LocalizationProvider>
  );
}
