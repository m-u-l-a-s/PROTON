import {createTheme} from "@mui/material";
import { blue, grey } from "@mui/material/colors";


export const LightTheme = createTheme({
    // configuração da paleta de cores 
    palette:{
        //cor primaria cor do modo claro, ela é usada em botões coisas com mais destaque
        primary:{ 
            main: blue[500],   //a cor mais usada
            dark: blue[600],     //é a cor primaria um pouco mais escura, tipo pra um hover
            light: blue[400],
            contrastText: '#000000',  //faz constraste com a cor primaria

        },

        secondary:{
            main: "#ACB3BA",  
            dark: grey[300],     
            light: blue[500],
            contrastText: '#ffffff',
        },

        background:{
            default: '#D1DaDB',  //usado no fundo do site
            paper:'#ffffff' ,    //usado dentro de card
        }
    }
});

