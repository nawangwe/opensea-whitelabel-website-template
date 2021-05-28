import * as React from 'react';
import { useRouter } from "next/router";
import { AppNavBar } from 'baseui/app-nav-bar';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import {useStyletron} from 'baseui';
import Footer from '../components/footer';
import { FaLightbulb } from 'react-icons/fa';
import useDarkMode from 'use-dark-mode'
import { LabelLarge } from 'baseui/typography';

interface PageProps {
  children?: React.ReactNode
  pageRoute: String
}

function Page ({ children, pageRoute }: PageProps) {

  const router = useRouter()

  const [css, theme] = useStyletron();

  const [mainItems, setMainItems] = React.useState([
    { label: "Home", active: pageRoute.toLowerCase() === 'home'},
    { label: "Gallery", active: pageRoute.toLowerCase() === 'gallery'},
    { label: "About", active: pageRoute.toLowerCase() === 'about' },
    { label: "Toggle Dark Mode"}
  ]);

  const darkMode = useDarkMode()

  return (
    <div className={css({
      backgroundColor: theme.colors.primaryB,
      minHeight: '100vh'
      })}>
        <AppNavBar
            title={process.env.NEXT_PUBLIC_TITLE}
            mainItems={mainItems}
            mapItemToNode={(item) => {
              if(item.label == "Toggle Dark Mode") {
                return <FaLightbulb style={{width: 30, height: 30}} color={theme.colors.contentPrimary}/>
              } else return <LabelLarge>{item.label}</LabelLarge>
            }}
            onMainItemSelect={(item) => {
              if (item.label == "Toggle Dark Mode"){
                darkMode.toggle()
              } else router.push(item.label.toLowerCase() === 'home' ? "/" : `/${item.label.toLowerCase()}`)
            }}
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
