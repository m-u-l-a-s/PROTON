import { Button, Grid, Typography } from "@mui/material";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
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
      <Grid item>
        <Button
          size="small"
          onClick={() => onDelete(file)}
        >
          Deletar
        </Button>
      </Grid>
    </Grid>
  );
}
