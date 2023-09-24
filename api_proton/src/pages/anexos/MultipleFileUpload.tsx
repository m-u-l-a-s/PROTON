import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Grid, Typography, Button } from "@mui/material/";
import { useField } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SingleFileUploadWithProgress, UploadableFile } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploadError";
import './Anexos.css'



export function MultipleFileUpload({
    name,
    buttonClicked,
}: {
    name: string;
    buttonClicked: boolean;
}) {
    const [_, __, helpers] = useField(name);
    const [files, setFiles] = useState<UploadableFile[]>([]);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Função para lidar com a seleção de arquivos
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        console.log("Arquivos na DropZone:", acceptedFiles);

        // Mapeia os arquivos aceitos e adicione-os à lista de arquivos
        const mappedAcc = acceptedFiles.map((file) => ({
            file,
            errors: [],
            id: uuidv4(), // Gera um UUID no tipo "String"
        }));
        
        // Filtra novos arquivos que não estão na lista atual
        const newFiles = mappedAcc.filter(
            (newFile) =>
                !files.some((existingFile) => existingFile.file === newFile.file)
        );

        // Atualiza a lista de arquivos
        setFiles((curr) => [...curr, ...newFiles]);
    }, [files]);

    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    // Função para deletar um arquivo da lista
    function onDelete(file: File) {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    }

    // Verifica se todos os uploads estão completos
    function checkAllUploadsComplete() {
        const allFilesUploaded = files.every((fw) => fw.url);
        setUploadComplete(allFilesUploaded);
    }

    // Lida com o clique no botão "Anexar arquivos", é a funcão que faz o Upload
    const uploadAnexo = async () => {
        if (isLoading) {
            return;
        }

        // Define isLoading como true para evitar cliques repetidos
        setIsLoading(true);

        // Array para armazenar os arquivos enviados com sucesso
        const uploadedFiles: UploadableFile[] = [];
        for (const fileWrapper of files) {
            if (!fileWrapper.url) {
                try {
                    // Cria um objeto FormData e adicione o arquivo a ele
                    const formData = new FormData();
                    formData.append("files", fileWrapper.file);

                    // Envia o arquivo para o servidor
                    const response = await axios.post(
                        "http://localhost:5000/insert_anexo",
                        formData
                    );
                    const fileUrl = response.data.url;

                    // Adiciona o arquivo enviado à lista de arquivos enviados com sucesso
                    uploadedFiles.push({
                        file: fileWrapper.file,
                        url: fileUrl,
                        id: fileWrapper.id,
                        errors: [],
                    });
                } catch (error) {
                    console.error("Erro ao enviar o arquivo para o backend:", error);
                }
            }
        }

        // Atualiza a lista de arquivos com os arquivos enviados com sucesso
        setFiles((curr) =>
            curr.map((fw) => {
                const uploadedFile = uploadedFiles.find((uf) => uf.file === fw.file);
                if (uploadedFile) {
                    return {
                        ...fw,
                        url: uploadedFile.url,
                        id: uploadedFile.id,
                        errors: uploadedFile.errors,
                    };
                }
                return fw;
            })
        );

        // Aguarda um segundo antes de permitir cliques no botão novamente
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    // Configurações para a área de drop dos arquivos
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 10 * 1024 * 1024, // Tamanho máximo de 10 MB
    });

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                {/* Área de drop dos arquivos */}
                <div
                    {...getRootProps()}
                    className={`dropzone ${hovered ? "hovered" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <input {...getInputProps()} />
                    <CloudUploadIcon fontSize="large" color="primary" />
                    <Typography variant="inherit">
                        Arraste o arquivo ou clique para procurar
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className="file-list-container">
                    {/* Renderiza a lista de arquivos */}
                    {files.map((fileWrapper) => (
                        <div key={fileWrapper.id}>
                            {fileWrapper.errors.length ? (
                                <UploadError
                                    file={fileWrapper.file}
                                    errors={fileWrapper.errors}
                                    onDelete={onDelete}
                                />
                            ) : (
                                <SingleFileUploadWithProgress
                                    onDelete={onDelete}
                                    file={fileWrapper.file}
                                    onAllUploadsComplete={checkAllUploadsComplete}
                                    buttonClicked={buttonClicked}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Grid>

            <Grid item xs={12}>
                {/* Botão "Anexar arquivos" */}
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!files.length || uploadComplete || isLoading}
                    onClick={uploadAnexo}
                >
                    {isLoading ? "Carregando..." : "Anexar arquivos"}
                </Button>
            </Grid>
        </Grid>
    );
}
