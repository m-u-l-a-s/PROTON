import { Button, Grid, Typography } from "@mui/material";
import { dowloadFileAtURL } from "../../control/dowsloadFIleAtURL";
import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  fileType: string;
  fileData: any;
  currentDate: Date;
}

export function FileHeader({ file, onDelete, fileType, fileData, currentDate }: FileHeaderProps) {
  const [insertionDate, setInsertiondDate] = useState(currentDate);

  const baixarAnexo = () => {
    dowloadFileAtURL(file.name, fileData, fileType);
  };


  function formatDateToBrasil(data: string) {
    if (data.length > 10) {
      data = formatData(new Date(data));
    }

    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split("-")[0];
    const month = data.split("-")[1]; // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split("-")[2];
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const formatData = (today: Date) => {
    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() retorna um valor de 0-11 por isso o +1
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

    return formattedDate;
  };

  //data dia/mês/ano
  const formattedDate = formatDateToBrasil(insertionDate.toString());
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
      <Grid item marginLeft="0.7em">
        <Typography variant="body2" fontFamily={"poppins"} fontSize={"1em"} color={"white"}>
          {file.name} - {formattedDate}
        </Typography>
      </Grid>
      <Grid item>
        <Button sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'0.9em', display: fileType === "UploadError" ? "none" : "" }} size="small" onClick={baixarAnexo}>
          <DownloadIcon/>
          Baixar
        </Button>
        <Button sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'0.9em', display: fileType === "UploadError" ? "" : "none" }} size="small" onClick={() => onDelete(file)}>
          <DeleteIcon/>
          Deletar
        </Button>
      </Grid>
    </Grid>
  );
}

export default FileHeader;
