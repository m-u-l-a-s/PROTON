import { Box, Button, FilledInput, Grid, IconButton, InputAdornment, InputLabel, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import React, { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomTextField from "../../shared/components/mui/CustomTextField";


export const NovoProjeto = () => {

  const styles = {
    label: {
      fontSize: '1.6rem',
      color: '#B6F3F8',
      fontFamily: 'Poppins',
    },
    input: {
      fontSize: '1.3rem',
      color: 'white',
      padding: '10px',
      fontFamily: 'Poppins',
    },
  };




  const navigate = useNavigate();
  const [processo_responsavel_id, setProcesso_responsavel_id] = useState(1)
  const [processo_nome, setProcesso_nome] = useState('')
  const [processo_descricao, setProcesso_descricao] = useState('')

  const inserirProcesso = async () => {
    try {

      const body = { processo_responsavel_id, processo_nome, processo_descricao }
      const response = await fetch("http://localhost:5000/insert_processo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.status === 200) {
        navigate("/MyProjects");
      }

    } catch (error: any) {
      console.error(error.message)
    }
  }

  //modal de salvar projeto
  const handleAdd = () => {
    Swal.fire({
      title: "Tem certeza que deseja criar esse projeto?",
      customClass: "swalFire",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span style="color: black;">Sim</span>',
      confirmButtonColor: "#b6f3f8",
      cancelButtonText: "Não",
    }).then((result: any) => {
      if (result.isConfirmed) {
        inserirProcesso();
      }
      if (result.isConfirmed) {
        Swal.fire({
          title: "Processo criado com sucesso!",
          customClass: "swalFire",
          confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
          confirmButtonColor: "#b6f3f8",
        })
      }
    });
  };

  return (


    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxHeight="100vh"
      flexDirection="column"
      sx={{ gap: 3 }}
    >
      <Paper
        sx={{
          mt: 3,
          padding: 7,
          borderRadius: 5,
          width: 'fit-content',
          height: 'fit-content',
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          maxWidth: '70%',
          maxHeight: '50%',
          marginTop: '5%',
        }}
      >


        <Grid container spacing={3}>
          <Grid item xs={12} marginLeft={"-0.5rem"} marginTop={"-1.5em"}>
            <IconButton className="meuBotao" component={Link} to="/MyProjects">
              <ArrowBackRoundedIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} marginTop={'-1em'}>
            <Typography variant="h4" color="primary" style={{ fontFamily: 'poppins' }}>
              Novo Processo
            </Typography>
          </Grid>

          <Grid item xs={12} marginTop={'-1em'}>

            <TextField
                  id="nome-projeto"
                  label="Nome:"
                  variant="standard"
                  sx={{ width: '100%' }}
                  value={processo_nome}
                  onChange={(e) => setProcesso_nome(e.target.value)}/>



            <TextField
              label="Nome:"
              id="standard-start-adornment"
              sx={{ width: '100%' }}
              value={processo_nome}
              onChange={(e) => setProcesso_nome(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
                style: styles.input, // Estilo para o texto digitado
              }}
              InputLabelProps={{
                style: styles.label, // Estilo para a label
              }}
              variant="standard"
            />




          </Grid>

          <Grid item xs={12} marginTop={'-1em'}>
{/* 
            <TextField
              id="standard-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              variant="standard"
              sx={{ width: '100%' }}
              value={processo_descricao}
              onChange={(e) => setProcesso_descricao(e.target.value)}
            /> */}


            <TextField
              id="standard-multiline-static"
              defaultValue="Default Value"
              label="Descrição:"
              variant="standard"
              multiline
              rows={2}
              sx={{ width: '100%' }}
              value={processo_descricao}
              onChange={(e) => setProcesso_descricao(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
                style: styles.input, // Estilo para o texto digitado
              }}
              InputLabelProps={{
                style: styles.label, // Estilo para a label
              }}
            />


          </Grid>
        </Grid>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{ background: '#292A2D', color: 'white', fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }}
            >
              Descartar
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              startIcon={< SaveIcon />}
              onClick={handleAdd}
              sx={{ fontFamily: 'poppins', fontSize: '1em', fontWeight: 'bold' }}
            >
              Salvar Processo
            </Button>
          </Grid>

        </Grid>

      </Paper>
    </Box>

  );
}

