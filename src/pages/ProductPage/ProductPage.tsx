import React from 'react';

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
} from '@mui/material';
import { Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = [
  {
    name: '05.01',
    price: 2400,
  },
  {
    name: '05.02',
    price: 1398,
  },
  {
    name: '05.03',
    price: 9800,
  },
  {
    name: '05.04',
    price: 3908,
  },
  {
    name: '05.05',
    price: 4800,
  },
  {
    name: '05.06',
    price: 3800,
  },
  {
    name: '05.07',
    price: 4300,
  },
];

const productInfo = [
  { label: 'Ядер', value: 6 },
  { label: 'Потоков', value: 12 },
  { label: 'Сокет', value: 'LGA 2066' },
  { label: 'Энергопотребление', value: '120ватт' },
  { label: 'Год выпуска', value: 2012 },
  { label: 'Частота', value: '2.28 Ггц' },
];

const productPrices = [
  { id: 1, name: 'INTEL I5 10400F', seller: 'DNS', price: 13370 },
  { id: 2, name: 'INTEL I5 10400F', seller: 'Ситилинк', price: 12000 },
];

const ProductPage: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: 2,
        pb: 4,
      }}
    >
      <Typography component="h1" variant="h2" color="text.primary" gutterBottom>
        INTEL I5 10400F
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper} sx={{ height: 400 }}>
            <Table>
              <TableBody>
                {productInfo.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell width={180}>{row.label}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
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
  );
};

export default ProductPage;
