import * as React from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdbIcon from '@mui/icons-material/Adb';
import { Chip, Icon } from '@mui/material';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';


type HeaderProps = {
  user?: any;
  loading: boolean;
};


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, isLoading } = useUser();

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
              <Box sx={{ flex:1, textAlign:"center" }}>
          <Typography
            href="/"
            variant="h6"
            noWrap
            color="secondary"
            component="a"
            sx={{
              mr: 2,
              paddingLeft: '1rem',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            COMISSIONS.APP
          </Typography>
                </Box>

          {
            user ? (
              <>
              <Box>
                <NovuProvider  subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'9SKjzgN_odAF'}>
                  <PopoverNotificationCenter  colorScheme={'light'}>
                    {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                  </PopoverNotificationCenter>
                </NovuProvider>
              </Box>
                <Box>
                  <Chip
                    onClick={handleOpenUserMenu}
                    label={user.name}
                    color="secondary"
                    variant={'outlined'}
                    style={{ marginLeft: '10px', minWidth: '5rem', maxWidth:'10rem' }}
                  />
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Button color="primary" href="profile">Settings</Button>
                  </MenuItem>
                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                      <Button color="error" href="/api/auth/logout">Logout</Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
            <>
            <Button key="login"  href='/api/auth/login' onClick={handleCloseNavMenu}  sx={{ my: 2, display: 'block', color:"white" }}>
                Login
              </Button>
              <Button key="signup"  href='/api/auth/login' onClick={handleCloseNavMenu}  sx={{ my: 2, display: 'block', color:"white" }}>
                Signup
              </Button>
            </>
              
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;