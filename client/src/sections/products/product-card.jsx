import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '../../components/label';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  position: 'relative',
  maxWidth: 345,
  margin: 'auto',
});

const InlineActionArea = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default function ShopProductCard({ pet }) {
  return (
    <StyledCard>
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
      <CardMedia
        component="img"
        height="194"
        image={pet.img}
        alt={pet.name}
      />
      <CardContent>
        <InlineActionArea>
          <Typography variant="h6" component="span">
            {pet.name}
          </Typography>
          <div>
            <IconButton color="primary" aria-label="edit" size="large">
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="delete" size="large">
              <DeleteIcon />
            </IconButton>
          </div>
        </InlineActionArea>
      </CardContent>
    </StyledCard>
  );
}

ShopProductCard.propTypes = {
  pet: PropTypes.object.isRequired,
};
