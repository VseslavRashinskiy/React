import React from 'react';
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

interface CardState {
  open: boolean;
}

class CarCards extends React.Component<CardCarsProps, CardState> {
  constructor(props: CardCarsProps) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="cards" data-testid="cards">
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea onClick={this.handleOpen}>
            <CardMedia
              component="img"
              height="300"
              image={this.props.item.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.props.item.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="modal-title">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {this.props.item.name}
                </Typography>
                <IconButton aria-label="delete" onClick={this.handleClose}>
                  <HighlightOffIcon />
                </IconButton>
              </div>
              <img src={this.props.item.image} alt={this.props.item.name} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                The character {this.props.item.name} is a {this.props.item.gender} and is in a{' '}
                {this.props.item.status} status. Possesses the race {this.props.item.species} and
                reside in a place {this.props.item.location.name}.
              </Typography>
            </Box>
          </Modal>
        </Card>
      </div>
    );
  }
}

export default CarCards;
