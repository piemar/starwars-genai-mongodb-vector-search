import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

export default function CharacterCard(props){
  const characterId = props.characterId
  const fileName=props.fileName
  const name=props.name
  return (
    <div style={{marginTop:'10px', marginBottom: '20px'}}>
    <Card sx={{ maxWidth: 345 }}   >
      <CardHeader style={{height:'5px', backgroundColor:'silver'}}
        title={name}
      />      
      <CardMedia
        id={characterId}
        component="img"
        alt={name}
        height="140"
        image={fileName}
      />
    </Card>
    </div>
  );
}
