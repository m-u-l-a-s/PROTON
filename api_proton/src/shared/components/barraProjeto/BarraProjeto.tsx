import React from 'react';
import { AppBar, Container, Toolbar, Grid, Button, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const BarraProjeto = (prop:any) => {
     const theme = useTheme();

     return (
          <AppBar position="static" color="secondary">
               <Container maxWidth="xl">
                    <Toolbar disableGutters>
                         <Grid item width={600} fontFamily={'Poppins, sans-serif'} fontSize={'bold'}>
                         {prop.processo_nome}
                         </Grid>
                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>
                              <Stack direction="row" spacing={3}>
                                   <Button variant="text">Histórico</Button>
                                   <Button variant="text">Relatórios</Button>
                              </Stack>
                         </Grid>
                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>
                              <IconButton edge="end" color="inherit" aria-label="menu">
                                   <MoreVertIcon />
                              </IconButton>
                         </Grid>
                    </Toolbar>
               </Container>
          </AppBar>
     );
}