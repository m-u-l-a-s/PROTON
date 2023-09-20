import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BarraProjeto } from "../../shared/components";
import { CardProcesso } from "./CardProcesso";
export const MyProjects = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{ gap: 3 }}
            justifyContent="center"
        >
            <Typography variant="h4" color="primary">
                Seus Processos
            </Typography>
            <Paper
                sx={{
                    mt: 3,
                    padding: 3,
                    borderRadius: 5,
                    width: "1000px",
                    height: "480px",
                    gap: 3,
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                <CardProcesso></CardProcesso>
                <CardProcesso></CardProcesso>
                <CardProcesso></CardProcesso>
                <CardProcesso></CardProcesso>
                <CardProcesso></CardProcesso>

                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "60vh" }}
                >
                    <Button
                        component={Link}
                        to="/NovoProjeto"
                        variant="contained"
                        disableElevation
                    >
                        {" "}
                        + Criar Processo{" "}
                    </Button>
                </Grid>
            </Paper>
        </Box>
    );
};
