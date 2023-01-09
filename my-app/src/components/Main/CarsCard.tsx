import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

const style = {
  position: 'absolute' as const,
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CarCards = (props: CardCarsProps) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="cards" data-testid="cards">
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia component="img" height="300" image={props.item.image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.item.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-title">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.item.name}
              </Typography>
              <IconButton aria-label="delete" onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            </div>
            <img src={props.item.image} alt={props.item.name} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              The character {props.item.name} is a {props.item.gender} and is in a{' '}
              {props.item.status} status. Possesses the race {props.item.species} and reside in a
              place {props.item.location.name}.
            </Typography>
          </Box>
        </Modal>
      </Card>
    </div>
  );
};

export default CarCards;
