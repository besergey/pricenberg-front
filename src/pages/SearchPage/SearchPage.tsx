import React from 'react';

import {
  Box,
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
  Link,
} from '@mui/material';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, generatePath, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

import routes from 'config/routes';

import { FilterForm } from 'components/forms';

import styles from './SearchPage.module.scss';

interface SearchFormValues {
  query: string;
}

const searchFormSchema: yup.ObjectSchema<SearchFormValues> = yup.object().shape({
  query: yup.string().required(),
});

const filterWidth = 240;

const rows = [
  { id: 1, name: 'AMD 5500х', cores: 6, threads: 12, power: '90ватт', socket: 'AM4', price: 8700 },
  { id: 2, name: 'Intel i5 1499', cores: 6, threads: 12, power: '120ватт', socket: 'LGA 2066', price: 10500 },
];

const SearchPage: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell align="right">Кол-во ядер</TableCell>
                  <TableCell align="right">Кол-во потоков</TableCell>
                  <TableCell align="right">Мощность</TableCell>
                  <TableCell align="right">Сокет</TableCell>
                  <TableCell align="right">Цена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Link
                        className={styles.link}
                        component={RouterLink}
                        to={generatePath(routes.product, { productId: row.id })}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.cores}</TableCell>
                    <TableCell align="right">{row.threads}</TableCell>
                    <TableCell align="right">{row.power}</TableCell>
                    <TableCell align="right">{row.socket}</TableCell>
                    <TableCell align="right">{row.price}₽</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default SearchPage;
