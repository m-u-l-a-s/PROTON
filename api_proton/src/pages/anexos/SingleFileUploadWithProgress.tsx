import { Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileHeader } from "./FileHeader";
import { FileError } from "react-dropzone";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onAllUploadsComplete: () => void;
  buttonClicked: boolean;
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
}: SingleFileUploadWithProgressProps) {
  useEffect(() => {
    onAllUploadsComplete();
  }, [buttonClicked, onAllUploadsComplete]);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={0} />
    </Grid>
  );
}
