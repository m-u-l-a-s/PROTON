import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { left } from '@popperjs/core';
import { IconButton } from '@mui/material';

const VoltarButton = () => {
  const handleVoltar = () => {
    window.history.back();




    const buttonStyles = {
          backgroundColor: '#616161', 
          color: '#000000', 
          border: 'none', 
          outline: 'none',
          marginLeft: '-10px',
         };
  };

  return (
    <IconButton
      className="meuBotao"
      style={{ marginLeft: '-10px' }} // Ajuste a margem à esquerda conforme necessário
      onClick={handleVoltar}
    >
      <ArrowBackRoundedIcon fontSize="medium" />
    </IconButton>
  );
};

export default VoltarButton;




// import React from 'react';
// import Button from '@mui/material/Button';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// const MeuBotaoVoltar = () => {
//   const handleVoltar = () => {
//     window.history.back();
//   };

//   return (
//     <Button style={{ border: '1px solid', padding: '10px' }} onClick={handleVoltar}>
//       <ArrowBackRoundedIcon />
    
//     </Button>
//   );
// };

// export default MeuBotaoVoltar;





// import React from 'react';
// import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

// const VoltarButton = () => {
//   const buttonStyles = {
//     backgroundColor: '#616161', 
//     color: '#000000', 
//     border: 'none', // Remover a borda
//     outline: 'none',
//   };

//   const handleVoltar = () => {
//     window.history.back();
//   };

//   return (
//     <button style={buttonStyles} onClick={handleVoltar}>
//       <ArrowCircleLeftRoundedIcon />
//     </button>
//   );
// };

// export default VoltarButton;

