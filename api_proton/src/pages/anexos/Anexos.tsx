import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import { BarraProjeto } from "../../shared/components";
import { Formik, Form } from 'formik';
import { MultipleFileUpload } from "./MultipleFileUpload";
import { UploadableFile } from "./SingleFileUploadWithProgress";
import * as Yup from 'yup';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

export const Anexos = () => {
    const initialValues: { files: UploadableFile[] } = { files: [] };
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();

    const handleNavigateToProcesso = () => {
        navigate("/DetalheEtapa");
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{ gap: 3 }}
            justifyContent="center"
        >
            <Paper
                sx={{
                    mt: 3,
                    padding: 3,
                    borderRadius: 5,
                    width: "1000px",
                    height: "480px",
                    gap: 3,
                }}
            >
                <Grid item sx={{ mt: "8em", marginLeft: "1em" }}>
                    <IconButton
                        className="meuBotao"
                        onClick={handleNavigateToProcesso}
                    >
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Grid>

                <BarraProjeto children={undefined}></BarraProjeto>

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
                                    <MultipleFileUpload name="files" buttonClicked={buttonClicked} />
                                </Grid>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};
