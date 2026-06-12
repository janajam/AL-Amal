

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { sidebarItems, type SidebarItem, type UserRole } from '../Entities/SidebarItems';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  userRole: UserRole;
}

export default function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const allowedRoutes: SidebarItem[] = sidebarItems.filter((route) =>
    route.roles.includes(userRole)
  );

  const drawerContent = (
    <Box sx={{ height: '27%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Box
        sx={{
          height: '100%',
          width: '96%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          mb: '-20px'
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, px: 2, bgcolor: 'white' }}>

        <List sx={{ mt: 1 }}>
          {allowedRoutes.map((route) => {
            const isSelected = location.pathname === route.path;
            const IconComponent = route.icon;

            return (
              <ListItem key={route.path} disablePadding sx={{ mb: 1, bgcolor: 'white' }}>
                <ListItemButton
                  component={Link as any}
                  to={route.path}
                  selected={isSelected}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    mx: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      boxShadow: '0px 4px 12px rgba(26, 123, 155, 0.3)',
                      '& .MuiListItemIcon-root': { color: '#ffffff' },
                      '&:hover': { backgroundColor: theme.palette.primary.dark }
                    },
                    '&:hover': {
                      backgroundColor: '#f0f7f9',
                      color: theme.palette.primary.main,
                      '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                    }
                  }}
                >
                  <ListItemIcon sx={{
                    color: isSelected ? '#ffffff' : theme.palette.primary.main,
                    minWidth: '40px',
                    fontSize: '14px',
                    fontWeight: isSelected ? '600' : '500'
                  }}
                  >
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box sx={{
        display: { sm: 'none' },
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 1100
      }}>

        <IconButton
          color="primary"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            bgcolor: 'white',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
              }
            }
          }}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          slotProps={{
            paper: {
              sx: {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                boxShadow: '10px 0px 30px rgba(26, 123, 155, 0.2)',
                borderRadius: 4,
                zIndex: 1200,
              }
            }
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  );
}
