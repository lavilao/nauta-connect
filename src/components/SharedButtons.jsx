import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  FacebookLegacyIcon,
  FacebookMessengerLegacyIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinLegacyIcon,
  LinkedinShareButton,
  TelegramLegacyIcon,
  TelegramShareButton,
  WhatsappLegacyIcon,
  WhatsappShareButton,
  XLegacyIcon,
  XShareButton,
} from 'react-share';
import { connect } from 'react-redux';

export const ShareSocialBtn = ({ Btn, Icon, tooltip, title, shareUrl, ...props }) => {
  return (
    <Tooltip title={tooltip} arrow>
      <Btn quote={title} url={shareUrl} sx={{ mr: 0.625 }} {...props}>
        <Icon size={32} round />
      </Btn>
    </Tooltip>
  );
};

const ShareButtons = ({ className, configs, ...props }) => {
  const shareUrl = configs.urlShared;
  const title =
    configs.navigator === 'firefox'
      ? 'Complemento de Mozilla Firefox para conectarse a la Red Nauta de ETECSA'
      : 'Extensión de Google Chrome para conectarse a la Red Nauta de ETECSA';

  return (
    <Box className={className} {...props}>
      <Typography align="left">Compartir extensión por:</Typography>
      <ShareSocialBtn
        Btn={FacebookShareButton}
        Icon={FacebookLegacyIcon}
        tooltip="Facebook"
        title={title}
        shareUrl={shareUrl}
      />
      <ShareSocialBtn
        Btn={FacebookMessengerShareButton}
        Icon={FacebookMessengerLegacyIcon}
        tooltip="Messenger"
        title={title}
        shareUrl={shareUrl}
      />
      <ShareSocialBtn
        Btn={WhatsappShareButton}
        Icon={WhatsappLegacyIcon}
        tooltip="Whatsapp"
        title={title}
        shareUrl={shareUrl}
      />
      <ShareSocialBtn
        Btn={XShareButton}
        Icon={XLegacyIcon}
        tooltip="X"
        title={title}
        shareUrl={shareUrl}
      />
      <ShareSocialBtn
        Btn={TelegramShareButton}
        Icon={TelegramLegacyIcon}
        tooltip="Telegram"
        title={title}
        shareUrl={shareUrl}
      />
      <ShareSocialBtn
        Btn={LinkedinShareButton}
        Icon={LinkedinLegacyIcon}
        tooltip="Linkedin"
        title={title}
        shareUrl={shareUrl}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  configs: state.configs,
});

export default connect(mapStateToProps)(ShareButtons);