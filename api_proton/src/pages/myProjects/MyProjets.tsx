import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CardProcesso } from "./CardProcesso";
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

export const MyProjects = () => {
  

    // let processos = [
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Protótipo figma", anexo: "print.png", resp: "Alicea" },
    //     { name: "Tela de anexar documentos", anexo: "fodase.png", resp: "Alita" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },
    //     { name: "Cards de processos", anexo: "print_github.png", resp: "Joice" },

    // ]

        const [processos,setProcesso] = useState([
            {processo_nome:"Etapa 1", processo_descrição: "Pendente", processo_responsavel_id: "descrição bla bla bla"},
            {processo_nome:"Etapa 2", processo_descrição: "Concluida", processo_responsavel_id: "descrição bla bla bla"},
            {processo_nome:"Etapa 3", processo_descrição: "Pendente", processo_responsavel_id: "descrição bla bla bla"},
        ])
    
        const get_processos = async () => {

           
            try {
                const response = await fetch("http://localhost:5000/get_processos")
                const jsonData = await response.json()
    
                setProcesso(jsonData)
                console.log(processos)
            } catch (error:any) {
                console.log(error.message)
            }
        }
    
        //[] como segundo argumento impede de fazer request 24/7, fazendo apenas uma request
        useEffect(() => {
            get_processos();
        }, [])


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
                width: 'fit-content',
                height: 'fit-content',
                gap: 2,
                display: "flex",
                flexDirection: "column",
                maxWidth: '70%',
                maxHeight: '50%',
                marginTop: '5%',
                }}
            >
                <Box display="flex" alignItems="flex-start" maxHeight="100vh" flexDirection="row" sx={{ gap: 70 }}>
                    
                    <div className="divBox">
                        
                        <Typography variant="h4" color="primary">
                        Seus Processos
                        </Typography>
                        
                        <Button 
                        component={Link}
                        to="/NovoProjeto"
                        variant="contained"
                        disableElevation
                        sx={{position: 'absolute', left: '68.9%', marginTop:'-2.6%'}}
                        >
                        + Criar Processo
                        </Button>
                        
                    </div>
                </Box>
      
                <Box sx={{ height: '50vh', overflowY: 'auto', display: "flex", flexDirection: "column" }}>

                    <Grid item display="flex" flexDirection={"row"} flexWrap={"wrap"} gap={3} marginLeft={3}>
                        {processos.map((processos) => (
                        <CardProcesso
                            name={processos.processo_nome}
                            // anexo={processo.anexo}
                            resp={processos.processo_responsavel_id}
                        />
                        ))}
                    </Grid>

                </Box>

          </Paper>
        </Box>
      );
}