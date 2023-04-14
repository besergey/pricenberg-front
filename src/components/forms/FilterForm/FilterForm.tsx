import React from 'react';

import {
  Box,
  List,
  Stack,
  Toolbar,
  Divider,
  ListItem,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material';

const FilterForm: React.FC = () => {
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
        <ListItem>
          <Box width="100%">
            <Typography gutterBottom>Сокет</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="AM2" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="AM3" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="AM4" />
            </FormGroup>
          </Box>
        </ListItem>
      </List>
    </>
  );
};

export default FilterForm;
