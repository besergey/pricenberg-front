import React from 'react';

import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Box } from '@mui/material';

import { ReactComponent as Logo } from 'static/images/logo.svg';

import routes from 'config/routes';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ height: '64px', padding: '12px 0' }}>
            <Logo className={styles.logo} />
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
              ПРАЙЗЕНБЕРГ
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
