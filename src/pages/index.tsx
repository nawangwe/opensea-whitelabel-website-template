import * as React from 'react';
import { AppNavBar } from 'baseui/app-nav-bar';
import { useStyletron } from 'baseui';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Image from 'next/image'

export const sum = (a: number, b: number) => a + b;



const Index: React.FC = () => {
  return (
    <div>
      <AppNavBar
        title={"Opensea Template"}
      />
      <HeaderImage />
        <Grid behavior={BEHAVIOR.fluid}>
          <Cell span={12}>

          </Cell>
        </Grid>
    </div>
  );
};

const HeaderImage = (props) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        position: "relative",
        height: "200px",
      })}
    >
      <Image
        layout="fill"
        objectFit="cover"
        src="/images/header.jpg"
        alt="header" />
    </div>)
};

export default Index;
