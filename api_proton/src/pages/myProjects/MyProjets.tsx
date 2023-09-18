import { Box, Paper, Typography, Button, Grid,  } from "@mui/material";
import './styles.css';

export const MyProjects = () => {
  
    return (
        <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh"
        flexDirection="column" sx={{gap:3}}>

            <Paper sx={{mt:3, padding:3, borderRadius: 5,  width: '1000px', height: '480px', gap: 3}}>

                <Typography variant="h4" color="primary">Seus Projetos</Typography>

                <Grid item>
                    <Button className="botaolindao " variant="contained" disableElevation > + Criar Projeto </Button>
                </Grid>

            </Paper>

        </Box>
    )
}


    