import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BarraProjeto } from "../../shared/components";
import { CardProcesso } from "./CardProcesso";
export const MyProjects = () => {

    let processos = [
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Protótipo figma", anexo: "print.png", resp: "Alicea" },
        { name: "Tela de anexar documentos", anexo: "fodase.png", resp: "Alita" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
        { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },

    ]


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
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    // overflow: "scroll",
                    // overflowX: "hidden"
                    

                }}
            >
 
                        <Box  display="flex" alignItems="flex-start" maxHeight="100vh" flexDirection="row" sx={{gap: 70}}> 
                
                            <Grid item>
                            
                    
                                    <Typography variant="h4" color="primary">
                                            Seus Processos
                                    </Typography>
                            
                            </Grid>

                            <Grid item>

                            
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
                        </Box>

                
                        
                        

                        
                        <Box sx={{ height: "40vh", overflowY: 'auto', display:"flex"}}>


                       
                               <Grid item display="flex" flexWrap={"wrap"} gap={3}>

                                {
                                    processos.map((processo) => (
                                        <CardProcesso
                                        name={processo.name}
                                        anexo={processo.anexo}
                                        resp={processo.resp}
                                        />
                                        ))
                                    }
                                    
                                    
                                 </Grid>
                               

                        </Box>

                        

                

            </Paper>
        </Box>
    );
};
