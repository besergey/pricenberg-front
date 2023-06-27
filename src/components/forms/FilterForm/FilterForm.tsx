import React, { SetStateAction, ChangeEvent, ChangeEventHandler, Suspense, useEffect, useState } from 'react';

import axios from 'axios';

import { API_URL } from 'const/env';
import { Category } from 'types/api';

import {
  Box,
  List,
  Stack,
  Toolbar,
  Divider,
  ListItem,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Button,
} from '@mui/material';

const FilterForm: React.FC<{
  setFilterFields: React.Dispatch<SetStateAction<{ [key: string]: string | { [key: string]: string } }>>;
  setCategory: React.Dispatch<SetStateAction<Category | null>>;
}> = ({ setFilterFields, setCategory }) => {
  enum CategoryType {
    Processor = 'Processor',
    Videocard = 'Videocard',
    HardDrive = 'HardDrive',
    SolidDrive = 'SolidDrive',
    MemoryKit = 'MemoryKit',
  }

  const mapBorder = (border: string): string => {
    if (border === 'От') {
      return 'from';
    } else {
      return 'to';
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentCategoryFilterFields, setCurrentCategoryFilterFields] = useState<{
    [key: string]: string | { [key: string]: string };
  }>({});

  const mapCurrentCategory = (category: string): CategoryType => {
    if (category === 'Видеокарты') {
      return CategoryType.Videocard;
    } else if (category === 'Процессоры') {
      return CategoryType.Processor;
    } else if (category === 'Твердотельные накопители') {
      return CategoryType.SolidDrive;
    } else if (category === 'Жесткие диски') {
      return CategoryType.HardDrive;
    } else {
      return CategoryType.MemoryKit;
    }
  };

  const handleFilterFieldChange = (value: string, fieldName: string, border?: string) => {
    if (border) {
      currentCategoryFilterFields[`${fieldName}_${mapBorder(border)}`] = value;
      setCurrentCategoryFilterFields({ ...currentCategoryFilterFields });
    } else {
      currentCategoryFilterFields[fieldName] = value;
      setCurrentCategoryFilterFields({ ...currentCategoryFilterFields });
    }
  };

  const renderPriceFilters = () => (
    <>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Цена, ₽</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'price', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'price', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const renderProcessorFilters = () => (
    <>
      {renderPriceFilters()}
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Базовая Частота, МГц</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'min_freq', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'min_freq', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Количество ядер</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'core_count', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'core_count', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const renderVideocardFilters = () => (
    <>
      {renderPriceFilters()}
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Объем памяти</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'memory_size', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'memory_size', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Тип памяти</Typography>
          <Stack direction="row" spacing={1}>
            <Select
              value={'GDDR6'}
              onChange={(e: SelectChangeEvent) => handleFilterFieldChange(e.target.value, 'memory_type')}
              fullWidth
            >
              {['GDDR3', 'GDDR4', 'GDDR5', 'GDDR5X', 'GDDR6', 'GDDR6X', 'DDR4', 'DDR5'].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Частота</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'freq', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'freq', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const renderMemoryKitFilters = () => (
    <>
      {renderPriceFilters()}
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Объем памяти</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Кол-во модулей в комплекте</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'module_count')}
              label="Кол-во"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Форм фактор</Typography>
          <Select
            value={'SO-DIMM'}
            onChange={(e: SelectChangeEvent) => handleFilterFieldChange(e.target.value, 'form_factor', 'От')}
            fullWidth
          >
            {['SO-DIMM', 'DIMM'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Тип памяти</Typography>
          <Stack direction="row" spacing={1}>
            <Select
              value={'DDR3L'}
              onChange={(e: SelectChangeEvent) => handleFilterFieldChange(e.target.value, 'memory_type', 'От')}
              fullWidth
            >
              {['DDR3L', 'DDR4', 'DDR4L', 'DDR5'].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Скорость</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'speed', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'speed', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Тайминги</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'timing')}
              label="Тайминги"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const renderSolidDriveFilters = () => (
    <>
      {renderPriceFilters()}
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Емкость</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Скорость чтения</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'read_speed', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'read_speed', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Скорость записи</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'write_speed', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'write_speed', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const renderHardDriveFilters = () => (
    <>
      {renderPriceFilters()}
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Форм-фактор</Typography>
          <Select
            value={'3.5'}
            onChange={(e: SelectChangeEvent) => handleFilterFieldChange(e.target.value, 'form_factor', 'От')}
            fullWidth
          >
            {['3.5', '2.5'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Емкость</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'capacity', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
      <ListItem>
        <Box width="100%">
          <Typography gutterBottom>Кэш</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'cache', 'От')}
              label="От"
              variant="standard"
            />
            <TextField
              onChange={(e) => handleFilterFieldChange(e.target.value, 'cache', 'До')}
              label="До"
              variant="standard"
            />
          </Stack>
        </Box>
      </ListItem>
    </>
  );

  const handleFilters = () => {
    setFilterFields({ ...currentCategoryFilterFields });
  };

  const getCategoryByName = (categoryName: string) => {
    return (categories.find((c) => c.name === categoryName)?.id || 1).toString();
  };

  const getCategories = async () => {
    try {
      const response: { data: { categories: Category[] } } = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const filteredCategory = categories.find((c) => c.name === event.target.value) || null;
    setCategory(filteredCategory);
    setCurrentCategory(mapCurrentCategory(event.target.value));
    setCurrentCategoryFilterFields({
      category: getCategoryByName(event.target.value),
      categoryName: mapCurrentCategory(event.target.value),
    });
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
            <Select onChange={handleSelectChange} fullWidth>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </ListItem>
        <Suspense fallback={<CircularProgress />}>
          {currentCategory === CategoryType.Processor && renderProcessorFilters()}
          {currentCategory === CategoryType.Videocard && renderVideocardFilters()}
          {currentCategory === CategoryType.MemoryKit && renderMemoryKitFilters()}
          {currentCategory === CategoryType.SolidDrive && renderSolidDriveFilters()}
          {currentCategory === CategoryType.HardDrive && renderHardDriveFilters()}
        </Suspense>
        <Box display="flex" onClick={handleFilters} alignItems={'center'} justifyContent={'center'} width="100%">
          <Button variant="contained">Применить</Button>
        </Box>
      </List>
    </>
  );
};

export default FilterForm;
