import React, { lazy, Suspense } from 'react';

import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { colors, createTheme, CssBaseline, CircularProgress } from '@mui/material';

import routes from 'config/routes';
import MainLayout from 'layouts/MainLayout';

const CatalogPage = lazy(() => import('pages/CatalogPage'));
const SearchPage = lazy(() => import('pages/SearchPage'));
const ProductPage = lazy(() => import('pages/ProductPage'));

const mdTheme = createTheme({
  palette: {
    primary: colors.deepPurple,
    secondary: colors.deepPurple,
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path={routes.root} element={<MainLayout />}>
              <Route index element={<CatalogPage />} />
              <Route path={routes.search} element={<SearchPage />} />
              <Route path={routes.product} element={<ProductPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
