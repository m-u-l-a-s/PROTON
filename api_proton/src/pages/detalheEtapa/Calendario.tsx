import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface CalendarioEtapaProps {
  dataBanco: string;
}

export function CalendarioEtapa({ dataBanco }: CalendarioEtapaProps) {
  // Converte a string dataBanco para um objeto Day.js
  const value = dayjs(dataBanco, "DD-MM-YYYY");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker value={value} />
    </LocalizationProvider>
  );
}








