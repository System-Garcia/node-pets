import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';

import Iconify from '../../components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const renderContent = (
    <Toolbar sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Searchbar />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </Toolbar>
  );

  return (
    <AppBar sx={{
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer + 1,
      bgcolor: 'transparent',
      transition: theme.transitions.create('width'),
      ...theme.mixins.toolbar,
    }}>
      {renderContent}
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func.isRequired,
};