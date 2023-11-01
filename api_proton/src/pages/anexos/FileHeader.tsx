import { Button, Grid, Typography } from "@mui/material";
import { dowloadFileAtURL } from "../../control/dowsloadFIleAtURL";
import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
// import Swal from "sweetalert2";
const Swal = require('sweetalert2');
export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  fileType: string;
  fileData: any;
  currentDate: Date;
  validaEdicao:any;
  etapa_anexo_id:number;
}

export function FileHeader({ file, onDelete, fileType, fileData, validaEdicao, currentDate, etapa_anexo_id }: FileHeaderProps) {
  const [insertionDate, setInsertiondDate] = useState(currentDate);

  const baixarAnexo = () => {
    dowloadFileAtURL(file.name, fileData, fileType);
  };

  // Modal confirmação de deletar
  const deletarModal = () => {
    Swal.fire({
      title: "Tem certeza que deseja deletar este anexo?",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    }).then((result: any) => {
      if (result.isConfirmed) {
        DeletarAnexo();
        showSuccessModal()
      }
    });
  };

  const showSuccessModal = () => {
    Swal.fire({
      title: "Anexo deletado com sucesso!",
      customClass: "swalFire",
      confirmButtonText: "OK",
      confirmButtonColor: "#b6f3f8",
    }).then(() => {
      // Recarrega a página após o modal ser fechado
      window.location.reload();
    });
  };

  const DeletarAnexo = async () => {
    try {
      const body = {
        etapa_anexo_id,
      };
      console.log(body);
      const response = await fetch(`http://localhost:5000/deletarAnexo/${etapa_anexo_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      //showSuccessModal()
    } catch (error: any) {
      console.log(error.message);
    }
  }


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

        <Button sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'0.9em', display: (fileType === "UploadError") || validaEdicao ? "none" : "" }} size="small" onClick={deletarModal}>
        <DeleteIcon />
          Deletar
        </Button>
        
        <Button sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'0.9em', display: fileType === "UploadError" ? "" : "none" }} size="small" onClick={() => onDelete(file)}>
          <ClearIcon/>
          Remover
        </Button>
      </Grid>
    </Grid>
  );
}

export default FileHeader;
