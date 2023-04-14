import React from 'react';

import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Container, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';

import routes from 'config/routes';
import { categories } from 'const/categories';

import { CategoryCard } from 'components/catalogPage';

interface SearchFormValues {
  query: string;
}

const searchFormSchema: yup.ObjectSchema<SearchFormValues> = yup.object().shape({
  query: yup.string().required(),
});

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();

  const searchForm = useForm<SearchFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  const handleSearchSubmit = searchForm.handleSubmit(async (values) => {
    navigate(`${routes.search}?query=${values.query}`);
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          ПРАЙZЕНБЕРГ
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Свободный агрегатор цен
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ p: '2px 4px', mt: 4, mb: 4, display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <Controller
            name="query"
            control={searchForm.control}
            render={({ field }) => (
              <InputBase
                {...field}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск"
                inputProps={{ 'aria-label': 'search' }}
              />
            )}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {categories.map((category) => (
            <CategoryCard key={category.id} id={category.id} name={category.name} image={category.image} />
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default CatalogPage;
