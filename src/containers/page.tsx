import * as React from 'react';
import { AppNavBar } from 'baseui/app-nav-bar';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';

interface PageProps {
  children?: React.ReactNode
}

function Page ({ children }: PageProps) {

  const [mainItems, setMainItems] = React.useState([
    { label: "Gallery", active: true },
    { label: "About" }
  ]);

  return (
    <div>
        <Grid behavior={BEHAVIOR.fixed}>
          <Cell span={12}>
          <AppNavBar
            title={process.env.NEXT_PUBLIC_TITLE}
            mainItems={mainItems}
          />
          <div style={{marginTop: 50}}>
            {children}
          </div>
          </Cell>
        </Grid>
    </div>
  );
};
export default (Page);
