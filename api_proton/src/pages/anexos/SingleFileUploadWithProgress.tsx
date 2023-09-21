import { Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { FileHeader } from "./FileHeader";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      // Chama a função de upload assíncrona para fazer o upload do arquivo
      const url = await uploadFile(file, setProgress);

      // Chama a função onUpload com a URL do arquivo após o upload ser concluído
      onUpload(file, url);
    }

    // Chama a função de upload quando o componente é montado (equivalente a componentDidMount)
    upload();
  }, []); // O array vazio como segundo argumento garante que o efeito seja executado apenas uma vez

  return (
    <Grid item>
      {/* Renderiza o cabeçalho do arquivo com opção de exclusão */}
      <FileHeader file={file} onDelete={onDelete} />

      {/* Renderiza uma barra de progresso linear para acompanhar o progresso do upload */}
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

// Função para fazer o upload do arquivo e retornar a URL após o upload ser concluído
function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage)); // Atualiza o progresso conforme o upload ocorre
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);

    xhr.send(formData);
  });
}
