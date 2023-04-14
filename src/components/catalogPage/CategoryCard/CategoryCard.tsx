import React from 'react';

import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import routes from 'config/routes';

interface CategoryCardProps {
  id: number;
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, image, name }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      component={Link}
      to={`${routes.search}?category=${id}`}
      sx={{
        textDecoration: 'none',
      }}
    >
      <Card>
        <CardMedia
          sx={{ height: 150, width: '100%', backgroundSize: 'contain', backgroundPosition: 'center' }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ textAlign: 'center' }}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
