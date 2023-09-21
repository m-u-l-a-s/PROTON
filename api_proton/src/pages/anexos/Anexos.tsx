import React from "react";
import { Box, Paper, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { BarraProjeto } from "../../shared/components";
import { Form, Formik } from 'formik';
import { MultipleFileUpload } from "./MultipleFileUpload";
import { array, object, string } from 'yup';

export const Anexos = () => {
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
                <BarraProjeto children={undefined}></BarraProjeto>

                <Card>
                    <CardContent>
                        <Formik initialValues={{ files: [] }}
                            validationSchema={object({
                                files: array(
                                    object({
                                        url: string().required()
                                    })
                                ),
                            })}
                            onSubmit={(values) => {
                                console.log('values', values);
                                return new Promise((res) => setTimeout(res, 2000));
                            }}>
                            {({ values, errors, isValid, isSubmitting }) => (
                                <Form>
                                    <Grid container spacing={2} direction="column">
                                        <MultipleFileUpload name="files" />

                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={!isValid || isSubmitting}
                                                type="submit">
                                                Anexar arquivos
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};
