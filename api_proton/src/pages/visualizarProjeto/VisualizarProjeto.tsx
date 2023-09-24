import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, IconButton, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Steps } from '../novoProjeto/Steps';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


const VisualizarProjeto = () => {
  const location = useLocation();
  const [etapa, setEtapa] = useState([
    { etapa_id: 1, etapa_nome: 'Etapa 1', etapa_ordem: 'Pendente', etapa_descricao: 'descrição bla bla bla' },
    { etapa_id: 2, etapa_nome: 'Etapa 2', etapa_ordem: 'Concluida', etapa_descricao: 'descrição bla bla bla' },
    { etapa_id: 3, etapa_nome: 'Etapa 3', etapa_ordem: 'Pendente', etapa_descricao: 'descrição bla bla bla' },
  ]);

  const [etapa_id, setEtapa_id] = useState(999);

  const get_etapa = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_etapa');
      const jsonData = await response.json();
      setEtapa(jsonData);
      console.log(etapa);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_etapa();
  }, []);

  const navigate = useNavigate();

  const handleNavigateToNovaEtapa = () => {
    navigate('/NovaEtapa');
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" maxHeight="100vh" flexDirection="column">
      <Paper
        sx={{
          mt: 3,
          padding: 7,
          borderRadius: 5,
          width: "fit-content",
          height: "fit-content",
          gap: 2,
          display: "flex",
          flexDirection: "column",
          maxWidth: "70%",
          maxHeight: "50%",
          marginTop: "2%",
        }}
      >

        <Grid item sx={{ mt: "-1em", marginLeft:'-0.75em'}}>
          <IconButton component={Link} to="/MyProjects">
            <ArrowBackRoundedIcon />
          </IconButton>
        </Grid>

        <Box display="flex" alignItems="center" maxHeight="100vh" flexDirection="column">
          <Box display="flex" flexDirection="column" sx={{ gap: 3, marginTop:'-1.75em' }}>

            <Grid item>
              <TextField id="nome-projeto" label="Puxar nome" variant="standard" sx={{ width: '50vw' }} />
            </Grid>
            <Grid item>
              <TextField
                id="standard-multiline-static"
                label="Puxar descrição"
                multiline
                rows={2}
                variant="standard"
                sx={{ width: '50vw' }}
              />
            </Grid>

            <Grid>
              <Box sx={{ height: '27vh', overflowY: 'auto', gap: 1 }}>
                {etapa.map((etapa) => (
                  <Steps
                    key={etapa.etapa_id}
                    nEtapa={etapa.etapa_nome}
                    status={etapa.etapa_ordem}
                    desc={etapa.etapa_descricao}
                    etapa_id={etapa.etapa_id}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ width: '50vw' }} onClick={handleNavigateToNovaEtapa}>
                Adicionar Etapa
              </Button>
            </Grid>

          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VisualizarProjeto;
