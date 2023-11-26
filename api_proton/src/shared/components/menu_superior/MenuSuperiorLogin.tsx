import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Toolbar,
    useTheme,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { ReactNode } from "react";
import Logo from "../img/Proton.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    useEffectSession,
    useSessionStorageOrDefault,
} from "../../../control/useSessionStorage";
import { findAllByAltText } from "@testing-library/react";
import { BaseURL } from "../../../control/BaseURL";

export const MenuSuperiorLogin: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const theme = useTheme();
    const [usuario, setUsuario] = useState([
        {
            usuario_id: 1,
            usuario_nome: "Betrano",
            usuario_senha: "senha123",
            usuario_data_cadastro: new Date(),
            usuario_nivel: "CL",
            usuario_email: "betrano@gmail.com",
        },
    ]);

    const [usuarioAtual, setUsuarioAtual] = useState(
        useSessionStorageOrDefault("perfil", usuario[0])
    );
    useEffectSession("perfil", usuarioAtual);

    const salvaPerfil = (event: { target: { value: any } }) => {
        setUsuarioAtual(event.target.value);
        window.location.reload();
    };

    const get_usuario = async () => {
        try {
            const response = await fetch(`${BaseURL()}/get_usuario/`);
            const jsonData = await response.json();
            setUsuario(jsonData); // Update the state with fetched data
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        get_usuario();
    }, []);
    return (
        <>
            <Box width="100%" height="0">
                <AppBar position="fixed" color="secondary">
                    <Toolbar>
                        <Container maxWidth="xl">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img src={Logo} width={120} alt="logo" />
                                </Grid>

                                <Grid item style={{ marginLeft: "auto" }}>
                                    <span
                                        style={{
                                            marginRight: "20px",
                                            fontFamily: "poppins",
                                        }}
                                    ></span>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box width="100vw" marginTop={theme.spacing(0)}>
                {children}
            </Box>
        </>
    );
};