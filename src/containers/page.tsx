import * as React from 'react';
import { AppNavBar } from 'baseui/app-nav-bar';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import {useStyletron} from 'baseui';
import Footer from '../components/footer';

interface PageProps {
  children?: React.ReactNode
}

function Page ({ children }: PageProps) {

  const [mainItems, setMainItems] = React.useState([
    { label: "Gallery", active: true },
    { label: "About" }
  ]);

  const [css, theme] = useStyletron();

  return (
    <div className={css({
      backgroundColor: theme.colors.primaryB
      })}>
        <AppNavBar
            title={process.env.NEXT_PUBLIC_TITLE}
            mainItems={mainItems}
          />
        <Grid behavior={BEHAVIOR.fixed}>
          <Cell span={12}>
          <div style={{marginTop: 50}}>
            {children}
          </div>
          </Cell>
        </Grid>
        <Block paddingTop="100px">
        </Block>
        <Footer/>
    </div>
  );
};
export default (Page);
