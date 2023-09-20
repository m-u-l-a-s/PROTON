import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { BarraProjeto } from "../../shered/components";

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
            </Paper>
        </Box>
    );
};
