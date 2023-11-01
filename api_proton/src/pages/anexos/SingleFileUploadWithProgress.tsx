import { Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileHeader } from "./FileHeader";
import { FileError } from "react-dropzone";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onAllUploadsComplete: () => void;
  buttonClicked: boolean;
  fileType:string
  fileData:any
  currentDate: Date
  validaEdicao:any
  etapa_anexo_id:number
}

export interface UploadableFile {
  id: string | number;
  file: File;
  url?: string;
  errors: FileError[];
}

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onAllUploadsComplete,
  buttonClicked,
  fileType,
  fileData,
  currentDate,
  validaEdicao,
  etapa_anexo_id,
}: SingleFileUploadWithProgressProps) {
  useEffect(() => {
    onAllUploadsComplete();
  }, [buttonClicked, onAllUploadsComplete]);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} fileType = {fileType} fileData = {fileData} validaEdicao = {validaEdicao} currentDate={currentDate} etapa_anexo_id = {etapa_anexo_id}/>
      <LinearProgress variant="determinate" value={0} />
    </Grid>
  );
}
