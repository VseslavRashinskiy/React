import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Data } from './Main';

const SinglePage = () => {
  const { id } = useParams();
  const [isErr, setIsErr] = useState(false);
  const [character, setCharacter] = useState<Data>({
    id: 2,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: ['', ''],
    url: '',
    created: '',
  });
  useEffect(() => {
    async function componentDidMount() {
      try {
        const result = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(result.data);
      } catch (error) {
        setIsErr(true);
      }
    }
    componentDidMount();
  }, [id]);

  return (
    <div className="cards" data-testid="cards">
      {!isErr && (
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia component="img" height="300" image={character.image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {character.name}
            </Typography>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                The character {character.name} is a {character.gender} and is in a{' '}
                {character.status} status. Possesses the race {character.species} and reside in a
                place {character.name}.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
      {isErr && (
        <div>
          404 Page not found. Go <Link to="/">Home</Link>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
