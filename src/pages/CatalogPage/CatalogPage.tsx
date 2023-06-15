import React, { useEffect, useState } from 'react';

import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Container, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';

import routes from 'config/routes';
import { API_URL } from 'const/env';
import { Category } from 'types/api';

import { CategoryCard } from 'components/catalogPage';

interface SearchFormValues {
  query: string;
}

const searchFormSchema: yup.ObjectSchema<SearchFormValues> = yup.object().shape({
  query: yup.string().required(),
});

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const response: { data: { categories: Category[] } } = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getCategories();
  }, []);

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
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={`${API_URL}${category.picture}`}
            />
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default CatalogPage;
