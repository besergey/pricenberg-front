import React, { useEffect, useState } from 'react';

import {
  Box,
  Link,
  Paper,
  Table,
  Drawer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Container,
  InputBase,
  IconButton,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, generatePath, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

import routes from 'config/routes';
import { API_URL } from 'const/env';
import dictionary from 'const/dictionary';
import { SearchResponse } from 'types/api';

import { FilterForm } from 'components/forms';

import styles from './SearchPage.module.scss';

interface SearchFormValues {
  query: string;
}

const searchFormSchema: yup.ObjectSchema<SearchFormValues> = yup.object().shape({
  query: yup.string().required(),
});

const filterWidth = 240;

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

  const [products, setProducts] = useState<SearchResponse | null>(null);

  const getProducts = async (categoryId: string | null) => {
    try {
      const response: { data: SearchResponse } = await axios.get(`${API_URL}/products/search?category=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterToggle = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const searchForm = useForm<SearchFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  const handleSearchSubmit = searchForm.handleSubmit(async (values) => {
    setSearchParams({ query: values.query });
  });

  useEffect(() => {
    const categoryId = searchParams.get('category');
    getProducts(categoryId);
  }, [searchParams]);

  return (
    <Box display="flex" flexDirection="column">
      <Drawer
        variant="temporary"
        open={isMobileFilterOpen}
        onClose={handleFilterToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: filterWidth },
        }}
      >
        <FilterForm />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: filterWidth },
        }}
        open
      >
        <FilterForm />
      </Drawer>

      <Box sx={{ pt: 2, pb: 4, pl: { md: `${filterWidth}px` } }}>
        <Container maxWidth="xl">
          <Paper
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <IconButton sx={{ p: '10px', display: { md: 'none' } }} onClick={handleFilterToggle}>
              <FilterIcon />
            </IconButton>

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

          {products && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    {products.meta.fields.slice(0, 6).map((field) => (
                      <TableCell key={field} align="right">
                        {dictionary[field]}
                      </TableCell>
                    ))}
                    <TableCell align="right">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.items.map((product) => (
                    <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Link
                          className={styles.link}
                          component={RouterLink}
                          to={generatePath(routes.product, { productId: product.id })}
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      {products.meta.fields.slice(0, 6).map((field) => (
                        <TableCell key={field} align="right">
                          {product.description[field] as string}
                        </TableCell>
                      ))}
                      <TableCell align="right">10 000₽</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default SearchPage;
