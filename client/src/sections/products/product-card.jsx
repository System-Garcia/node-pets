import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { fCurrency } from '../../utils/format-number';
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils'; // Importa ColorPreview

export default function ShopProductCard({ pet }) {
  const renderImg = (
    <Box
      component="img"
      alt={pet.name}
      src={pet.img} // Cambiado de pet.cover a pet.img
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {pet.priceSale && fCurrency(pet.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(pet.price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {pet.status && (
          <Label
            variant="filled"
            color={(pet.status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {pet.status}
          </Label>
        )}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {pet.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {pet.colors && <ColorPreview colors={pet.colors} />}
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  pet: PropTypes.object.isRequired, // Asegura que pet sea un objeto y que sea requerido
};
