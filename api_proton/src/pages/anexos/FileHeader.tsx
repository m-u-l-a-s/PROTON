import { Button, Grid, Typography } from "@mui/material";
import { dowloadFileAtURL } from "../../control/dowsloadFIleAtURL";
export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  fileType:string;
  fileData:any;
}

export function FileHeader({ file, onDelete, fileType, fileData }: FileHeaderProps) {

  const baixarAnexo = () => {
    dowloadFileAtURL(file.name,fileData,fileType)
}

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
        <Typography variant="body2">{file.name}</Typography>
      </Grid>
      <Grid item >
        <Button sx = {{display: (fileType === "UploadError") ? "none" : "" }}
          size="small"
          onClick = {baixarAnexo}
        >
          Baixar
        </Button>
        <Button sx = {{display: (fileType === "UploadError") ? "" : "none" }}
          size="small"
          onClick={() => onDelete(file)}
        >
          Deletar
        </Button>
      </Grid>
    </Grid>
  );
}
