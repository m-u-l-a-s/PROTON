
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, useTheme} from "@mui/material"
import { ReactNode } from "react"
import  Logo from "../img/Proton.png";








export const MenuSuperior: React.FC <{ children: ReactNode }> = ({ children}) =>{
    
    const theme = useTheme();

    return(



       <>
    
       <Box width= "100vw" height={theme.spacing(8)}>
            <AppBar position="fixed" color="secondary">
                <Toolbar >
                    <Container maxWidth= "xl">

                        <Grid container direction="row" justifyContent="space-between" alignItems="center">

                            <Grid item>

                            <img src={Logo} width={120}/>  

                            </Grid>

                            <Grid item>
                            
                                <Stack  direction= "row" spacing={3}>
                                    <Button   variant="text">Home</Button>
                                    <Button   variant="text">Projetos</Button>
                                    <Button   variant="text">Calendário</Button>
                                    <Button   variant="text">Equipe</Button>
                                    <Button   variant="text">Documentos</Button>
                                </Stack>

                            </Grid>

                            <Grid item>Olá, Marcos</Grid>
                        
                        </Grid>

                    </Container>
                   
                </Toolbar>

            </AppBar>
       </Box>

        <Box width= "100vw" marginTop={theme.spacing(0)}   >
       
       {children}

        </Box>
       </> 
   
    )

}

