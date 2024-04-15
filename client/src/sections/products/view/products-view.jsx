import React, { useState, useEffect, useContext } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { get } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


import PetCard  from '../product-card';
import PetSort  from '../product-sort';
import PetFilters  from '../product-filters';
import PetCartWidget from '../product-cart-widget';

export default function PetsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [pets, setPets] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else {
      fetchPets();
    }
  }, [auth, navigate]);
  const fetchPets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. User must log in.");
        navigate('/login');
        return;
      }
      const response = await get('/pets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', response);

      setPets(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error: Unauthorized");
        navigate('/login');
      } else {
        console.error("Error fetching pets:", error);
      }
    }
  };
  

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Pets
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <PetFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <PetSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {
          pets.length > 0
            ? pets.map((pet) => (
                <Grid key={pet.id} xs={12} sm={6} md={3}>
                  <PetCard pet={pet} />
                </Grid>
              ))
            : <Typography>No pets data available</Typography>
        }
      </Grid>

      <PetCartWidget />
    </Container>
  );
}