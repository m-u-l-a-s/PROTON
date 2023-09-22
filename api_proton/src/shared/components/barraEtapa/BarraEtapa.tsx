import {AppBar, Container, Grid, Stack, Toolbar} from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import {ReactNode} from "react"
import { useTheme } from "@emotion/react";

export const BarraEtapa: React.FC <{ children: ReactNode }> = ({ children}) =>{
     const theme = useTheme();

     return (
          <AppBar position="static" color="secondary">
               <Container maxWidth="xl">
                    <Toolbar disableGutters>

                         <Grid item width={900} fontFamily={'Poppins, sans-serif'} fontSize={'bold'}>
                                   Puxar nome da Etapa
                         </Grid>

                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>

                              <Stack  direction= "row" spacing={3}>
                                   
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
