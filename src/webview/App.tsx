import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import Home from './pages/index';

const App: FC<{}> = () => {
  return (
    <ConfigProvider>
      <Home />
    </ConfigProvider>
  );
};

export default App;
