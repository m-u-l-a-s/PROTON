import { Button, Grid, Typography } from "@mui/material";
import { dowloadFileAtURL } from "../../control/dowsloadFIleAtURL";
import React from 'react';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  fileType: string;
  fileData: any;
}

export function FileHeader({ file, onDelete, fileType, fileData }: FileHeaderProps) {

  const baixarAnexo = () => {
    dowloadFileAtURL(file.name, fileData, fileType);
  }

  const currentDate = new Date(); // Obtém a data atual
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: "1px solid #ccc",
        paddingBottom: "4px",
      }}
    >
      <Grid item>
        <Typography variant="body2">
          {file.name} - {formattedDate}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ display: (fileType === "UploadError") ? "none" : "" }}
          size="small"
          onClick={baixarAnexo}
        >
          Baixar
        </Button>
        <Button
          sx={{ display: (fileType === "UploadError") ? "" : "none" }}
          size="small"
          onClick={() => onDelete(file)}
        >
          Deletar
        </Button>
      </Grid>
    </Grid>
  );
}

export default FileHeader;
