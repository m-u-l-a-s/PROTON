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

import { validarEdicao } from "../../../control/validarEdicao";

export const MenuSuperiorCadastro: React.FC<{
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
            const response = await fetch("http://localhost:5000/get_usuario/");
            const jsonData = await response.json();
            setUsuario(jsonData); // Update the state with fetched data
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        get_usuario();
    }, []);

    const [validaEdicao, setValidaEdicao] = useState(validarEdicao('MenuSuperior',0));

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

                                <Grid item style={{}}>
                                    <Stack direction="row" spacing={4}>
                                        <Button
                                            variant="text"
                                            component={Link}
                                            to="/Home"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                                justifyContent: "center",
                                                marginLeft: "400px",
                                            }}
                                            //função que esconde o botão para o CL ou AD
                                            //sx={{display: validaEdicao ? "none" : "flex"}}
                                        >
                                            Home
                                        </Button>

                                        <Button
                                            variant="text"
                                            component={Link}
                                            to="/MyProjects"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                            }}
                                            //função que esconde o botão para o CL 
                                            //sx={{display: validaEdicao ? "none" : "flex"}}
                                        >
                                            Processos
                                        </Button>

                                        <Button
                                            variant="text"
                                            component={Link}
                                            to="/Cadastro"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                            }}
                                            //função que esconde o botão para o CL
                                           // sx={{display: validaEdicao ? "none" : "flex"}}
                                        >
                                            Cadastrar usuário
                                        </Button>
                                    </Stack>
                                </Grid>

                                <Grid item style={{ marginLeft: "auto" }}>
                                    <span
                                        style={{
                                            marginRight: "20px",
                                            fontFamily: "poppins",
                                        }}
                                    >
                                        Perfil:
                                        <Select
                                            style={{
                                                color: "white",
                                                fontFamily: "poppins",
                                                marginLeft: "8px",
                                            }}
                                            value={usuarioAtual}
                                            onChange={salvaPerfil}
                                            id="SelectPerfil"
                                        >
                                            {usuario.map((usuarioItem) => (
                                                <MenuItem
                                                    style={{
                                                        color: "white",
                                                        fontFamily: "poppins",
                                                    }}
                                                    value={JSON.stringify(
                                                        usuarioItem
                                                    )}
                                                >
                                                    {usuarioItem.usuario_nome}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </span>
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
