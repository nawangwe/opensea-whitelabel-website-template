import * as React from 'react';
import {AppNavBar} from 'baseui/app-nav-bar';

export const sum = (a: number, b: number) => a + b;

const Index: React.FC = () => {
  return (
    <div>
      <AppNavBar
        title={"Opensea Template"}
      />
    </div>
  );
};

export default Index;
