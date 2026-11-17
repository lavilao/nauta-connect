import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Connect from './connect';

const ConnectController = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000 * 1.3);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 12.5 }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Container>
    );
  }

  return <Connect />;
};

export default ConnectController;