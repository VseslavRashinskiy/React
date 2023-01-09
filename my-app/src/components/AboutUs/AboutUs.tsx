import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export const AboutUs = () => {
  return (
    <div className="cardVses">
      <Card sx={{ maxWidth: 700 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image="https://i.ibb.co/LPVCjPL/image.png"
            alt="Vseslav"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Vseslav
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hi, my name is Vseslav, I am a novice frontend developer. I have been living in
              Georgia for half a year now.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <a href="https://github.com/lopyx191">GitHUB</a>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
