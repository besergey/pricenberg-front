import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { API_URL } from 'const/env';
import { Category } from 'types/api';

import { Box, List, Stack, Toolbar, Divider, ListItem, TextField, Typography, Select, MenuItem } from '@mui/material';

const FilterForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const response: { data: { categories: Category[] } } = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Toolbar />
      <Divider />

      <List>
        <ListItem>
          <Typography variant="h5">Фильтр</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Box width="100%">
            <Typography gutterBottom>Категория</Typography>
            <Select fullWidth>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Typography gutterBottom>Цена, ₽</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="От" variant="standard" />
              <TextField label="До" variant="standard" />
            </Stack>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Typography gutterBottom>Частота, МГц</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="От" variant="standard" />
              <TextField label="До" variant="standard" />
            </Stack>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Typography gutterBottom>Количество ядер</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="От" variant="standard" />
              <TextField label="До" variant="standard" />
            </Stack>
          </Box>
        </ListItem>
      </List>
    </>
  );
};

export default FilterForm;
