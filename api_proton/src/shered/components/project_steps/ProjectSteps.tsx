import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import './../../themes/style.css';



function renderRow(props: ListChildComponentProps) {
  const { index, style,} = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding className='corTexto'>
      <ListItemButton>
        <ListItemText primary={`Etapa ${index + 1}`} secondary="Pendente" />
      </ListItemButton>
    </ListItem>
    
  );
}

export const  ProjectSteps = () => {
  return (
   
    <FixedSizeList
    height={108}
    width={760}
    itemSize={62}
    itemCount={200}
    overscanCount={5}
    
  >
    {renderRow}
  </FixedSizeList>
        
     
   
  );
}



{/* <ListItem disablePadding>
<ListItemButton>

<ListItemText primary="Etapa 1" secondary="descrição do projeto blabalbal"/>

</ListItemButton>

</ListItem>
<Divider/>

<ListItem disablePadding>
<ListItemButton>

<ListItemText primary="Etapa 2" secondary="descrição do projeto blabalbal"/>

</ListItemButton>

</ListItem>
<Divider/>

<ListItem disablePadding>
<ListItemButton>

<ListItemText primary="Etapa 3" secondary="descrição do projeto blabalbal"/>

</ListItemButton>

</ListItem>
<Divider/> */}