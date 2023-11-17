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
    IconButton,
    Menu,
} from "@mui/material";
import { MouseEvent, ReactNode } from "react";
import Logo from "../img/Proton.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    useEffectSession,
    useSessionStorageOrDefault,
} from "../../../control/useSessionStorage";
import { findAllByAltText } from "@testing-library/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const MenuSuperior: React.FC<{
    children: ReactNode;
    hideHome: boolean;
    hideProcesses: boolean;
    hideDocuments: boolean;
    showCombo: boolean;
}> = ({ children, hideHome, hideProcesses, hideDocuments, showCombo }) => {
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

    // funções para menu ao lado do perfil

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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

                                <Grid item style={{marginLeft:"2.8rem"}}>
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
                                        >
                                            Processos
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
                                        Olá
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
                
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        style={{ color: "white" }}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem style={{ color: "white", fontFamily: "poppins" }}>
                                            Logout
                                        </MenuItem>
                                    </Menu>

                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box width="100vw" marginTop={theme.spacing(8)}>
                {children}
            </Box>
        </>
    );
};
