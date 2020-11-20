import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Home from 'components/home/Home';
import menu from 'libs/menu.json';

const HomeContainer = () => {
  const history = useHistory();
  const [native] = useState(history.location.pathname.substring(1));

  const onMenu = (divide: string) => {
    let menu = '';

    if (native === 'soldier') {
      menu = '현역';
    } else if (native === 'reserve') {
      menu = '예비역';
    } else if (native === 'general') {
      menu = '일반';
    }

    history.push(`/menu?native=${menu}&divide=${divide}`);
  };

  return <Home menu={menu} native={native} onMenu={onMenu} />;
};

export default HomeContainer;
