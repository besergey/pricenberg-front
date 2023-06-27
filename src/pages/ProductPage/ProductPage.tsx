import React, { Suspense, useEffect, useState } from 'react';

import {
  Card,
  Grid,
  Paper,
  Table,
  Button,
  TableRow,
  TableHead,
  Container,
  TableBody,
  TableCell,
  Typography,
  CardContent,
  TableContainer,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Product, ProductDescriptionType } from 'types/api';
import { useLocation } from 'react-router-dom';
import { API_URL } from 'const/env';

const mapProductDescription = (product: Product) => {
  if (product.description_type === ProductDescriptionType.Processor) {
    return [
      { label: 'Ядер', value: product.description.core_count },
      { label: 'Потоков', value: product.description.threads },
      { label: 'Сокет', value: product.description?.additional_properties?.socket as string },
      { label: 'Энергопотребление', value: product.description.tdp },
      { label: 'Год выпуска', value: product.description?.additional_properties?.release_date as string },
      { label: 'Базовая частота', value: product.description.min_freq },
      { label: 'Максимальная частота', value: product.description.max_freq },
    ];
  } else if (product.description_type === ProductDescriptionType.Videocard) {
    return [
      { label: 'Объем памяти', value: product.description.memory_size },
      { label: 'Тип памяти', value: product.description.memory_type },
      { label: 'Частота', value: product.description.freq },
      { label: 'Интерфейс', value: product.description.interface },
      { label: 'Чип', value: product.description?.additional_properties?.chip },
      { label: 'Год выпуска', value: product.description?.additional_properties?.release_date },
      { label: 'Ширина шины', value: product.description?.additional_properties?.bus_size },
      { label: 'Частота памяти', value: product.description?.additional_properties?.memory_freq },
    ];
  } else if (product.description_type === ProductDescriptionType.MemoryKit) {
    return [
      { label: 'Емкость', value: product.description.capacity },
      { label: 'Количество модулей в комплекте', value: product.description.module_count },
      { label: 'Форм-фактор', value: product.description.form_factor },
      { label: 'Тип памяти', value: product.description.memory_type },
      { label: 'Скорость', value: product.description.speed },
      { label: 'Тайминг', value: product.description.timing },
      { label: 'Ширина шины', value: product.description?.additional_properties?.bus_size },
      { label: 'Частота памяти', value: product.description?.additional_properties?.memory_freq },
    ];
  } else if (product.description_type === ProductDescriptionType.SolidDrive) {
    return [
      { label: 'Интерфейс', value: product.description.interface },
      { label: 'Емкость', value: product.description.capacity },
      { label: 'Скорость чтения', value: product.description.read_speed },
      { label: 'Скорость записи', value: product.description.write_speed }
    ];
  } else if (product.description_type === ProductDescriptionType.HardDrive) {
    return [
      { label: 'Форм-фактор', value: product.description.form_factor },
      { label: 'Емкость', value: product.description.capacity },
      { label: 'Кэш', value: product.description.cache },
    ];
  }
};

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();

  const getProduct = async (id: number) => {
    try {
      const response: { data: Product } = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const idArr = location.pathname.split('/');
    const id = parseInt(idArr[idArr.length - 1]);
    getProduct(id);
  }, [location.pathname]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {product && (
        <>
          <Container
            maxWidth="xl"
            sx={{
              pt: 2,
              pb: 4,
            }}
          >
            <Typography component="h1" variant="h2" color="text.primary" gutterBottom>
              {product.name}
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <TableContainer component={Paper} sx={{ height: 400 }}>
                  <Table>
                    <TableBody>
                      {mapProductDescription(product).map((row) => (
                        <TableRow key={row.label}>
                          <TableCell width={180}>{row.label}</TableCell>
                          <TableCell align="right">{row.value as string}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      График средней цены
                    </Typography>

                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="price" stroke="#673ab7" strokeWidth={2} />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} xl={8}>
                <TableContainer component={Paper} sx={{ height: 330 }}>
                  <Table component="div">
                    <TableHead component="div">
                      <TableRow component="div">
                        <TableCell component="div">Название</TableCell>
                        <TableCell component="div" align="right">
                          Продавец
                        </TableCell>
                        <TableCell component="div" align="right">
                          Цена
                        </TableCell>
                        <TableCell component="div" />
                      </TableRow>
                    </TableHead>
                    <TableBody component="div">
                      {productPrices.map((row) => (
                        <TableRow key={row.id} component="div">
                          <TableCell component="div">{row.name}</TableCell>
                          <TableCell component="div" align="right">
                            {row.seller}
                          </TableCell>
                          <TableCell component="div" align="right">
                            {row.price}
                          </TableCell>
                          <TableCell component="div" align="right">
                            <Button variant="text">Купить</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Suspense>
  );
};

export default ProductPage;
