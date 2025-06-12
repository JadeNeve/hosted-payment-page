import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuoteRequest } from '../../lib/createQuoteRequest';

const StartupRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const createAndNavigate = async () => {
      try {
        const { uuid } = await createQuoteRequest();
        navigate(`/payin/${uuid}`, { replace: true });
      } catch (error) {
        console.error('Failed to create quote:', error);
        navigate('/payin/error');
      }
    };

    createAndNavigate();
  }, [navigate]);

  return <div className="text-center mt-20">Getting things ready...</div>;
};

export default StartupRedirectPage;
