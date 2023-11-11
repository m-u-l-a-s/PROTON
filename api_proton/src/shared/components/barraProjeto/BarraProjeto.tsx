import { AppBar, Container, Toolbar, Grid, Button, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export const BarraProjeto = (prop: any) => {
     const theme = useTheme();

     return (
          <AppBar position="static" color="secondary">
               <Container maxWidth="xl">
                    <Toolbar disableGutters>

                         <Grid item marginRight={"1rem"}>
                              <IconButton className="meuBotao" onClick={() => prop.navigate("/MyProjects")}>
                                   <ArrowBackRoundedIcon />
                              </IconButton>

                         </Grid>

                         <Grid item width={700} fontFamily={'Poppins'} fontWeight={'bold'} fontSize={'1.8em'} marginLeft={"0.9rem"} >
                              {prop.processo_nome}
                         </Grid>

                         <Grid item alignItems={"right"} justifyContent={"flex-start"}>
                              <Stack direction="row" spacing={3}>
                                   <Button variant="text" style={{fontFamily: 'poppins', fontWeight:'bold', fontSize:'1em'}}>Histórico</Button>
                                   <Button variant="text" style={{fontFamily: 'poppins', fontWeight:'bold', fontSize:'1em'}}>Relatórios</Button>
                              </Stack>
                         </Grid>
                    </Toolbar>
               </Container>
          </AppBar>
     );
}