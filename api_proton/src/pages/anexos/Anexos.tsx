import React, { useEffect, useState } from 'react';
import {Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import { Formik, Form } from 'formik';
import { MultipleFileUpload } from "./MultipleFileUpload";
import { UploadableFile } from "./SingleFileUploadWithProgress";
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import { BaseURL } from '../../control/BaseURL';


export const Anexos = (prop:any) => {
    const initialValues: { files: UploadableFile[] } = { files: [] };
    const [buttonClicked, setButtonClicked] = useState(false);
    const [dataDoBanco, setDataDoBanco] = useState(""); //

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
                                    <MultipleFileUpload name="files" buttonClicked={buttonClicked} etapaId={prop.etapa_id} etapa_responsavel_id = { prop.etapa_responsavel_id}/>
                                </Grid>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
    );
};
