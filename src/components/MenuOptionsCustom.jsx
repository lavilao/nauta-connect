import React, { Fragment } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BusinessIcon from '@mui/icons-material/Business';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Tooltip from '@mui/material/Tooltip';

const MenuOptionsCustom = ({
  anchorEl,
  handleClose,
  theme,
  preventSleep,
  disableWarnings,
  autoProxy,
  ...props
}) => {
  return (
    <Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Tooltip
          enterDelay={2000}
          title={
            autoProxy
              ? 'El proxy se activara de forma automática al iniciar sesión, por lo que su navegación sera segura y anónima.'
              : 'Una vez iniciada la conexión usted puede iniciar la conexión privada si lo desea.'
          }
        >
          <MenuItem
            onClick={() => {
              if (autoProxy)
                chrome.runtime.sendMessage({ type: 'MANUAL_ENABLE_PROXY' });
              else chrome.runtime.sendMessage({ type: 'AUTO_ENABLE_PROXY' });
            }}
          >
            <ListItemIcon>
              {autoProxy ? (
                <VpnLockIcon fontSize="small" />
              ) : (
                <PersonPinCircleIcon fontSize="small" />
              )}
            </ListItemIcon>
            <Typography>Proxy {autoProxy ? `Automático` : `Manual`}</Typography>
          </MenuItem>
        </Tooltip>

        <Tooltip
          enterDelay={2000}
          title={
            preventSleep
              ? 'Se evitara que su ordenador se suspenda o apague mientras este conectado.'
              : 'Su ordenador puede suspenderse o apagarse mientras este conectado, según su configuración de sistema.'
          }
        >
          <MenuItem
            onClick={() => {
              if (preventSleep)
                chrome.runtime.sendMessage({ type: 'ALLOW_SLEEP_CONNECTED' });
              else
                chrome.runtime.sendMessage({ type: 'PREVENT_SLEEP_CONNECTED' });
            }}
          >
            <ListItemIcon>
              {preventSleep ? (
                <DesktopWindowsIcon fontSize="small" />
              ) : (
                <DesktopAccessDisabledIcon fontSize="small" />
              )}
            </ListItemIcon>
            <Typography>
              {preventSleep ? `Prevenir` : `Permitir`} Reposo
            </Typography>
          </MenuItem>
        </Tooltip>

        <Tooltip
          enterDelay={2000}
          title={
            theme === 'auto'
              ? 'La extensión tomara el tema por defecto del navegador.'
              : 'El tema de la extensión es el seleccionado manualmente.'
          }
        >
          <MenuItem
            onClick={() => {
              chrome.runtime.sendMessage({ type: 'NEXT_THEME' });
            }}
          >
            <ListItemIcon>
              {theme === 'auto' ? (
                <BrightnessAutoIcon fontSize="small" />
              ) : theme === 'dark' ? (
                <Brightness4Icon fontSize="small" />
              ) : (
                <Brightness7Icon fontSize="small" />
              )}
            </ListItemIcon>

            {theme === 'auto' ? (
              <Typography children="Modo Automático" />
            ) : theme === 'dark' ? (
              <Typography children="Modo Oscuro" />
            ) : (
              <Typography children="Modo Claro" />
            )}
          </MenuItem>
        </Tooltip>

        <Tooltip
          enterDelay={2000}
          title={
            disableWarnings
              ? 'Algunas advertencias no se mostrarán más..'
              : 'Se mostrarán todas las advertencias.'
          }
        >
          <MenuItem
            onClick={() => {
              if (disableWarnings)
                chrome.runtime.sendMessage({ type: 'ENABLE_WARNINGS' });
              else chrome.runtime.sendMessage({ type: 'DISABLE_WARNINGS' });
            }}
          >
            <ListItemIcon>
              {disableWarnings ? (
                <NotificationsOffIcon fontSize="small" />
              ) : (
                <NotificationsActiveIcon fontSize="small" />
              )}
            </ListItemIcon>

            {disableWarnings ? (
              <Typography children="Ocultar Advertencias" />
            ) : (
              <Typography children="Mostrar Advertencias" />
            )}
          </MenuItem>
        </Tooltip>

        <Divider />

        <Tooltip
          enterDelay={2000}
          title="Administrar todas las cuentas guardadas."
        >
          <MenuItem
            onClick={() => {
              chrome.runtime.sendMessage({ type: 'OPEN_DIALOG_USERS' });
              handleClose();
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Ver Cuentas</Typography>
          </MenuItem>
        </Tooltip>

        <Tooltip
          enterDelay={2000}
          title="Permite retomar una sesión si el navegador o sistema se ha cerrado y la cuenta continuo abierta."
        >
          <MenuItem
            onClick={() => {
              chrome.runtime.sendMessage({ type: 'LOAD_SESSION_FROM_STORAGE' });
              handleClose();
            }}
          >
            <ListItemIcon>
              <RotateLeftIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Recuperar sesión</Typography>
          </MenuItem>
        </Tooltip>

        <Divider />

        <Tooltip
          enterDelay={2000}
          title="Solicitar o activar una licencia para todas las funcionalidades de la extensión."
        >
          <MenuItem
            onClick={() => {
              const w = window.open('/license.html');
              w.focus();
              handleClose();
            }}
          >
            <ListItemIcon>
              <BusinessIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Licencia</Typography>
          </MenuItem>
        </Tooltip>

        <MenuItem
          onClick={() => {
            chrome.runtime.sendMessage({ type: 'OPEN_DIALOG_ABOUT' });
            handleClose();
          }}
        >
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Acerca de...</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MenuOptionsCustom;
