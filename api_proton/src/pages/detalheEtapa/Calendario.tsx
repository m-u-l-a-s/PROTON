import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { styled } from '@mui/system'; // Use o módulo @mui/system

const CustomDatePicker = styled(DatePicker)({
  '& input': {
    color: 'white', // Define a cor do texto como branca
    fontSize: '1.1rem', // Define o tamanho da fonte do texto
    fontFamily: 'Poppins', // Fonte Poppins
    
  },
  '& .MuiSvgIcon-root': {
    fill: 'white', // Define a cor do ícone como branca
  },
});

interface CalendarioEtapaProps {
  dataBanco: string;
  callback: Function;
}

export function CalendarioEtapa({ dataBanco, callback }: CalendarioEtapaProps) {
  const value = dayjs(dataBanco, "DD-MM-YYYY");

  //função que repassa o valor da data para o DetalheEtapa

  const handleCallback = (valor:string) =>{
    const valueCallback = new Date(valor);
    //console.log(valor);
    //console.log(valueCallback)
    callback(valueCallback)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <CustomDatePicker
        value={value} onChange={(value) => handleCallback(String(value))}
      />
    </LocalizationProvider>
  );
  
}
