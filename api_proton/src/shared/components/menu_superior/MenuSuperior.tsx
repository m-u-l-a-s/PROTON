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
import { useEffectSession, useSessionStorageOrDefault } from "../../../control/useSessionStorage";

export const MenuSuperior: React.FC<{ children: ReactNode }> = ({ children }) => {
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
      <Box width="100vw" height={theme.spacing(8)}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Container maxWidth="xl">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <img src={Logo} width={120} />
                </Grid>

                <Grid item>
                  <Stack direction="row" spacing={3}>
                    <Button variant="text" component={Link} to="/Home">
                      Home
                    </Button>
                    <Button variant="text" component={Link} to="/MyProjects">
                      Processos
                    </Button>
                    <Button variant="text">Calendário</Button>
                    <Button variant="text">Equipe</Button>
                    <Button variant="text">Documentos</Button>
                  </Stack>
                </Grid>

                <Grid item>
                  <span style={{ marginRight: 10, fontFamily: "Roboto" }}>Perfil:</span>
                  <Select  style={{ color: 'white' }} value={usuarioAtual} onChange={salvaPerfil}>
                    {usuario.map((usuarioItem) => (
                      <MenuItem style={{ color: 'white' }} value={JSON.stringify(usuarioItem)}>{usuarioItem.usuario_nome}</MenuItem>
                    ))}
                  </Select>
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
