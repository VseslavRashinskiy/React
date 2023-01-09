import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardCarsProps {
  cars: {
    id: number;
    car: string;
    car_model: string;
    color: string;
    car_vin: string;
    location: string;
  };
}
const CarCards = (props: CardCarsProps) => {
  return (
    <div className="cards" data-testid="cards">
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.cars.car}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Model: {props.cars.car_model}
          </Typography>
          <Typography variant="subtitle1" color={props.cars.color}>
            Color: {props.cars.color}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Location: {props.cars.location}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Car VIN: {props.cars.car_vin}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarCards;
