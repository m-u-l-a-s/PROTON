import React from "react";
import { FileHeader } from "./FileHeader";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, Typography, linearProgressClasses } from "@mui/material";
import { FileError } from "react-dropzone";

// Props para o componente de erro de upload
export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
  fileType:string
  fileData:any
  validaEdicao:any
}

// Estilização customizada para a barra de progresso de erro
const ErrorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.error.main,
  },
}));

export function UploadError({ file, onDelete, errors, fileType, fileData, validaEdicao }: UploadErrorProps) {
  return (
    <React.Fragment>
    {/* Renderiza o cabeçalho do arquivo com opção de exclusão */}
    <FileHeader file={file} fileType={fileType} fileData = {fileData} validaEdicao = {validaEdicao} onDelete={onDelete} currentDate={new Date()} etapa_anexo_id = {0}/>

    {/* Renderiza uma barra de progresso linear com estilo de erro (vermelho) */}
    <ErrorLinearProgress variant="determinate" value={100} sx={{ height: 8 }} /> 

    {/* Mapeia e renderiza mensagens de erro para cada erro */}
    {errors.map((error, index) => (
      <Box
        key={index}
        sx={{
          marginTop: 1, 
          marginBottom: 1, 
          opacity: 0.7, 
        }}
      >
        <Typography
          variant="body2"
          color="error"
        >
          {/* Exibe a mensagem de erro */}
          {/* Mensagem do Erro: {error.message}
          Código do Erro: {error.code} */}
          Tamanho do arquivo maior do que o suportado.
        </Typography>
      </Box>
    ))}
  </React.Fragment>
);
}