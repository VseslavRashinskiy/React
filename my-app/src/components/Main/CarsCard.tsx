import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface CardCarsProps {
  item: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
  };
}

const CarCards = (props: CardCarsProps) => {
  return (
    <div className="cards" data-testid="cards">
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea
          onClick={() => window.location.assign(`http://localhost:3000/inner/${props.item.id}`)}
        >
          <CardMedia component="img" height="300" image={props.item.image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.item.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CarCards;
