import React, { useEffect, useState } from 'react';
import {Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import { Formik, Form } from 'formik';
import { MultipleFileUpload } from "./MultipleFileUpload";
import { UploadableFile } from "./SingleFileUploadWithProgress";
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import { BaseURL } from '../../control/BaseURL';


export const Anexos = () => {
    const initialValues: { files: UploadableFile[] } = { files: [] };
    const [buttonClicked, setButtonClicked] = useState(false);
    const location = useLocation();
    const [etapa_id, setEtapaId] = useState(location.state.id);
    const [flag, setFlag] = useState(true)
    
    // const etapa_id = location.state.etapa_id; // Obtem o etapa_id da localização
    const [dataDoBanco, setDataDoBanco] = useState(""); //
  //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
    useEffect(() => {
    if (flag) {
      const get_etapa_by_id = async () => {
        //Puxando ID da tela anterior
        // console.log(location.state.id)
        const n = location.state.id;
        const idPag = n.toString();
        try {
          const response = await fetch(`${BaseURL()}/get_etapa/` + idPag);
          const jsonData = await response.json();
          setEtapaId(jsonData); // Update the state with fetched data
          //PUXANDO DATA DO BANCO
          const dataDoBanco = dayjs(jsonData.etapa_data_conclusao, "YYYY-MM-DD").format("DD-MM-YYYY");
          setDataDoBanco(dataDoBanco);
        } catch (error: any) {
          console.log(error.message);
        }
      };

      get_etapa_by_id(); // Call the function inside useEffect
      // You can now safely use the updated 'etapa' state here
    }
  }, );

    return (
                <Card>
                    <CardContent>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={Yup.object({
                                files: Yup.array(),
                            })}
                            onSubmit={(values) => {
                                console.log('values', values);
                                return new Promise((res) => setTimeout(res, 2000));
                            }}
                        >
                            <Form>
                                <Grid container spacing={2} direction="column">
                                    <MultipleFileUpload name="files" buttonClicked={buttonClicked} etapaId={etapa_id} etapa_responsavel_id = {location.state.etapa_responsavel_id}/>
                                </Grid>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
    );
};
