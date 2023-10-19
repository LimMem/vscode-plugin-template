import React, { FC } from 'react';
import { Button } from 'antd';
import './index.less';
import { useVscode } from '../../hooks/useVscode';

interface IndexProps {}

const Index: FC<IndexProps> = props => {
  // const { webview } = useVscode();
  return (
    <iframe
      className='iframe'
      src='https://4x.ant.design/docs/react/i18n-cn'
    >
      {/* <Button type='primary' size='large' onClick={() => {
        webview.postMessage("大大大")
      }}>
        按钮
      </Button> */}
    </iframe>
  );
};

export default Index;
