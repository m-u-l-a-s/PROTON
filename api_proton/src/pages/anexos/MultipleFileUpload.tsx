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
import Swal from 'sweetalert2';






export function MultipleFileUpload({
    name,
    buttonClicked,
    etapaId
}: {
    name: string;
    buttonClicked: boolean;
    etapaId: number;
}) {
    const [_, __, helpers] = useField(name);
    const [files, setFiles] = useState<UploadableFile[]>([]);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [etapa_anexo, setEtapa_anexo] = useState([
        {
            etapa_anexo_id: 1,
            etapa_id: 1,
            etapa_anexo_documento: [],
            etapa_anexo_nome: 'anexo_nome',
            etapa_anexo_tipo: 'anexo_tipo',
            etapa_anexo_data: new Date()
        }
    ])


    const Modal = () => {
        Swal.fire({
          title: "Tem certeza que deseja anexar esse arquivo?",
          customClass: "swalFire",
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<span style="color: black;">Sim</span>',
          confirmButtonColor: "#b6f3f8",
          cancelButtonText: "Não",
        }).then((result: any) => {
          if (result.isConfirmed) {
            uploadAnexo();
          }
        });
      };

      const showSuccessModal = () => {
        Swal.fire({
          title: "Anexo inserido com sucesso!",
          customClass: "swalFire",
          confirmButtonText: "OK",
          confirmButtonColor: "#b6f3f8",
        });
      };


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

    const get_anexo_by_id = async () => {
        //Puxando ID da tela anterior
        // console.log(location.state.id)
        const n = etapaId;
        const idPag = n.toString();
        try {
            const response = await fetch("http://localhost:5000/get_anexos_by_etapa/" + idPag);
            const jsonData = await response.json();
            //console.log(jsonData.anexos)
            setEtapa_anexo(jsonData.anexos)
            //console.log(etapa_anexo[1])
            //setEtapa_anexos(jsonData);
            //console.log(etapa_anexos)
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    useEffect(() => {
        get_anexo_by_id()
    }, [])

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
                    formData.append("etapa_id", etapaId.toString()); // Converte etapaId para string antes de anexá-lo
                    formData.append("fileName", fileWrapper.file.name)
                    formData.append("fileType", fileWrapper.file.type)
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
            showSuccessModal();
        }, 1000);
    };

    // Configurações para a área de drop dos arquivos
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 10 * 1024 * 1024, // Tamanho máximo de 10 MB
    });

    const convertToAny = (a:any) => {
        //Por algum motivo dá erro de compilação qnd eu coloco 'etapa_anexo_documento['data']' direto no construtor
        //anyway esses dados enviados para o construtor não serão usados para baixar o anexo ent se tiver uma forma melhor de fazer isso sou todos os ouvidos
        return a.etapa_anexo_documento['data']
    }

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
                    {/* Renderiza duas listas de arquivos: uma que vem do banco (etapa_anexo.map) e outra que o usuário está atualmente fazendo upload (files.map)*/}
                    {etapa_anexo.map((anexo_item) => (

                        <SingleFileUploadWithProgress
                            onDelete={onDelete}
                            file={new File([convertToAny(anexo_item)], anexo_item.etapa_anexo_nome)}
                            fileType={anexo_item.etapa_anexo_tipo}
                            fileData = {anexo_item.etapa_anexo_documento}
                            onAllUploadsComplete={checkAllUploadsComplete}
                            buttonClicked={buttonClicked}
                        />
                    ))}

                    {files.map((fileWrapper) => (
                        <div key={fileWrapper.id}>
                            {fileWrapper.errors.length ? (
                                <UploadError
                                    file={fileWrapper.file}
                                    fileType={"UploadError"}
                                    fileData = {""}
                                    errors={fileWrapper.errors}
                                    onDelete={onDelete}
                                />
                            ) : (
                                <SingleFileUploadWithProgress
                                    onDelete={onDelete}
                                    file={fileWrapper.file}
                                    fileType={"UploadError"}
                                    fileData = {""}
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
                    onClick={Modal}
                >
                    {isLoading ? "Carregando..." : "Anexar arquivos"}
                </Button>
            </Grid>
            
        </Grid>
    );
}
