import { Box, Paper, Typography, Button, Grid,  } from "@mui/material";
import { Link } from 'react-router-dom';

export const MyProjects = () => {
  
    return (
        <Box display="flex" alignItems="center" flexDirection="column" sx={{gap:3}} justifyContent="center">

            <Paper sx={{mt:3, padding:3, borderRadius: 5,  width: '1000px', height: '480px', gap: 3}}>

                <Typography variant="h4" color="primary">Seus Projetos</Typography>

                <Grid item container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
                    <Button component={Link} to="/NovoProjeto" variant="contained" disableElevation > + Criar Projeto </Button>
                </Grid>

            </Paper>
            
        </Box>
    )
}


    