import * as React from 'react';
import { useRouter } from "next/router";
import { AppNavBar } from 'baseui/app-nav-bar';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import {useStyletron} from 'baseui';
import Footer from '../components/footer';

interface PageProps {
  children?: React.ReactNode
  pageRoute: String
}

function Page ({ children, pageRoute }: PageProps) {

  const router = useRouter()

  const [mainItems, setMainItems] = React.useState([
    { label: "Home", active: pageRoute.toLowerCase() === 'home'},
    { label: "Gallery", active: pageRoute.toLowerCase() === 'gallery'},
    { label: "About", active: pageRoute.toLowerCase() === 'about' }
  ]);

  const [css, theme] = useStyletron();

  console.log(router.query.id)

  return (
    <div className={css({
      backgroundColor: theme.colors.primaryB
      })}>
        <AppNavBar
            title={process.env.NEXT_PUBLIC_TITLE}
            mainItems={mainItems}
            onMainItemSelect={(item) => router.push(item.label.toLowerCase() === 'home' ? "/" : `/${item.label.toLowerCase()}`)}
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
