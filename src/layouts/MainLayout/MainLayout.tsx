import React from 'react';

import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Box } from '@mui/material';

import routes from 'config/routes';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={routes.root}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ПРАЙZЕНБЕРГ
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <main>
        <Box sx={{ mt: { xs: '56px', sm: '64px' }, bgcolor: 'background.paper' }}>
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};

export default MainLayout;
