import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ArrState } from './Forms';

interface CardsFormProps {
  form: ArrState;
}

const CardsForm = (props: CardsFormProps) => {
  return (
    <div className="cards" data-testid="cards">
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.form.car}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Model: {props.form.model}
          </Typography>
          <Typography variant="subtitle1" color={props.form.color}>
            Color: {props.form.color}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Location: {props.form.location}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Car VIN: {props.form.vin}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsForm;
