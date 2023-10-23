import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
  id: string;
  label: string;
  styleProps: {
    labelColor?: string;
    inputColor?: string;
    labelFontSize?: string; // Adicionamos uma prop para o tamanho da fonte da label
    inputFontSize?: string; // Adicionamos uma prop para o tamanho da fonte do texto
  };
  variant?: 'standard' | 'outlined' | 'filled';
  sx?: { [key: string]: any };
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: {
    readOnly?: boolean;
  };
  multiline?: boolean;
  rows?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  styleProps,
  variant,
  sx,
  inputProps,
  multiline,
  rows,
  ...otherProps
}) => {
  const inputColor = styleProps.inputColor || 'white';
  const labelFontSize = styleProps.labelFontSize || '16 px'; // Tamanho da fonte da label
  const inputFontSize = styleProps.inputFontSize || '14 px'; // Tamanho da fonte do texto

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      sx={sx}
      InputLabelProps={{
        style: {
          color: styleProps.labelColor || 'black',
          fontSize: labelFontSize,
        },
      }}
      InputProps={{
        style: {
          color: inputColor,
          fontSize: inputFontSize,
        },
        ...inputProps,
      }}
      multiline={multiline}
      rows={rows}
      {...otherProps}
    />
  );
}

export default CustomTextField;
