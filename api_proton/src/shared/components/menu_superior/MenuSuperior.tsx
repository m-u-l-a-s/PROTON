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

export const MenuSuperior: React.FC<{ children: ReactNode; hideHome: boolean; hideProcesses: boolean; hideDocuments: boolean; showCombo: boolean }> = ({
    children, hideHome, hideProcesses, hideDocuments, showCombo }) => {
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
        {
            usuario_id: 2,
            usuario_nome: "Fulano",
            usuario_senha: "senha456",
            usuario_data_cadastro: new Date(),
            usuario_nivel: "LE",
            usuario_email: "fulano@gmail.com",
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
    return (
        <>
            <Box width="100%" height={theme.spacing(8)}>
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
                                    <img src={Logo} width={120} />
                                </Grid>

                                <Grid item>
                                    <Stack direction="row" spacing={3}>
                                    {!hideHome && (
                                        
                                        <Button
                                            variant="text"
                                            component={Link}
                                            to="/Home"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                                justifyContent: "center",
                                                marginLeft: "400px"
                                            }}
                                        >
                                            Home
                                        </Button>
                                    )}

                                        {!hideProcesses && (
                                        <Button
                                            variant="text"
                                            component={Link}
                                            to="/MyProjects"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                            }}
                                        >
                                            Processos
                                        </Button>
                                        )}

                                        {!hideDocuments && (
                                        <Button
                                            variant="text"
                                            style={{
                                                fontFamily: "poppins",
                                                fontWeight: "bold",
                                                fontSize: "1em",
                                            }}
                                        >
                                            Documentos
                                        </Button>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item style={{ marginLeft: 'auto' }}>
                                    {showCombo && (
                                    <span style={{
                                            marginRight: "20px",
                                            fontFamily: "poppins",        
                                        }}
                                    >
                                        Perfil:
                                    <Select
                                        style={{
                                            color: "white",
                                            fontFamily: "poppins",
                                            marginLeft: "8px"
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
                                    )}
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
