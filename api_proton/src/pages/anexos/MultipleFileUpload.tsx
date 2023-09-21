import React, { useCallback, useEffect, useState, CSSProperties } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { Grid, Typography } from '@mui/material/';
import { useField } from 'formik';
import { UploadError } from './UploadError';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

let currentId = 0;

function getNewId() {
    return ++currentId;
}

export interface UploadableFile {
    id: number;
    file: File;
    errors: FileError[];
    url?: string;
}

export function MultipleFileUpload({ name }: { name: string }) {
    const [_, __, helpers] = useField(name);

    const [files, setFiles] = useState<UploadableFile[]>([]);

    const [hovered, setHovered] = useState(false);

    // Callback para lidar com o upload de arquivos
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [], id: getNewId() }));
        const mappedRej = rejectedFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    // Atualiza o valor do campo do formulário com os arquivos selecionados
    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    // Função para lidar com o upload bem-sucedido de um arquivo
    function onUpload(file: File, url: string) {
        setFiles((curr) =>
            curr.map((fw) => {
                if (fw.file === file) {
                    return { ...fw, url };
                }
                return fw;
            })
        );
    }

    // Função para excluir um arquivo da lista
    function onDelete(file: File) {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    }

    // Configurações e propriedades do dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 300 * 1024, // Tamanho máximo de 300KB
    });

    // Estilos para o dropzone
    const dropzoneStyle: CSSProperties = {
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s ease',
        outline: 'none', 
    };

    // Estilos para a lista de arquivos
    const fileListContainerStyle: CSSProperties = {
        maxHeight: '200px',
        overflowY: 'auto',
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#cccccc #f0f0f0',
    };

    const hoverStyle: CSSProperties = {
        backgroundColor: 'darkgray', // Cor de fundo ao passar o mouse
    };

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                {/* Dropzone para fazer upload de arquivos */}
                <div {...getRootProps()} style={{
                    ...dropzoneStyle,
                    ...(hovered ? hoverStyle : {}), // Aplicando o estilo de hover quando necessário
                }}
                    onMouseEnter={() => setHovered(true)} // Ativar o estilo de hover ao entrar com o mouse
                    onMouseLeave={() => setHovered(false)}>
                    <input {...getInputProps()} />
                    <CloudUploadIcon fontSize="large" color="primary" />
                    <Typography variant='inherit'>Arraste o arquivo ou clique para procurar</Typography>
                </div>
            </Grid>

            <Grid item xs={12}>
                {/* Lista de arquivos selecionados */}
                <div style={fileListContainerStyle}>
                    {files.map((fileWrapper) => (
                        <div key={fileWrapper.id}>
                            {fileWrapper.errors.length ? (
                                // Mostra mensagens de erro se houver algum problema com o arquivo
                                <UploadError
                                    file={fileWrapper.file}
                                    errors={fileWrapper.errors}
                                    onDelete={onDelete}
                                />
                            ) : (
                                // Exibe o progresso do upload se o arquivo estiver sendo carregado
                                <SingleFileUploadWithProgress
                                    onDelete={onDelete}
                                    onUpload={onUpload}
                                    file={fileWrapper.file}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
}
