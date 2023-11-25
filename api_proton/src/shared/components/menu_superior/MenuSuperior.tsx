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
import { useEffectSession, useSessionStorageOrDefault } from "../../../control/useSessionStorage";
import { findAllByAltText } from "@testing-library/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { validarEdicao } from "../../../control/validarEdicao";
import { BaseURL } from "../../../control/BaseURL";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

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

  const [usuarioAtual, setUsuarioAtual] = useState(useSessionStorageOrDefault("perfil", usuario[0]));
  useEffectSession("perfil", usuarioAtual);

    const navigate = useNavigate(); 

  const salvaPerfil = (event: { target: { value: any } }) => {
    setUsuarioAtual(event.target.value);
    window.location.reload();
  };


    const logOut = () => {
        navigate("/");
    }


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

  // funções para menu ao lado do perfil

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let user;
  try {
    user = JSON.parse(usuarioAtual);
  } catch (error) {
    console.log(error);
  }

  // função para verificar se o perfil é CL -> não aparecer botões de home e processo
  const [validaEdicao, setValidaEdicao] = useState(validarEdicao("MenuSuperior", 0));
  const [btnCadastro, setBtnCadastro] = useState(validarEdicao("btnCadastro", 0));

  return (
    <>
      <Box width="100%" height="0">
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Container maxWidth="xl">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
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
                      //função que esconde o botão para o CL
                      sx={{ display: validaEdicao ? "none" : "flex" }}
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
                      sx={{ display: validaEdicao ? "none" : "flex" }}
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
                      sx={{ display: btnCadastro ? "flex" : "none" }}
                    >
                      <span style={{ padding: "10px" }}>Cadastrar</span> usuário
                    </Button>
                  </Stack>
                </Grid>

                <Grid item style={{ marginLeft: "auto" }}>
                  <span
                    id="currentUserText"
                    style={{
                      marginRight: "20px",
                      fontFamily: "poppins",
                      fontSize: "1.1em",
                    }}
                  >
                    {user && <>Olá, {user.usuario_nome}</>}

                    {/* <Select
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

                                        </Select> */}
                                    </span>

                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        style={{ color: "white" }}
                                        onClick={handleClick}
                                    >
                                        <LogoutIcon />
                                    </IconButton>

                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        onClick={logOut}
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
