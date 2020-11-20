import React, { useEffect, useState } from 'react';
import { dev_server, ENV, prod_server } from 'libs/constants';
import { setAccessToken } from 'libs/accessToken';
import Routes from 'Routes';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      ENV.NODE_ENV === 'production'
        ? `${prod_server}/refresh_token`
        : `${dev_server}/refresh_token`,
      {
        method: 'POST',
        credentials: 'include',
      }
    ).then(async (response) => {
      const { access_token } = await response.json();
      setAccessToken(access_token);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading</div>;

  return <Routes />;
};

export default App;
