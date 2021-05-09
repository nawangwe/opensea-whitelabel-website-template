import React from 'react';
import {useStyletron} from 'baseui';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';

import { SocialIcon } from 'react-social-icons';
import { LabelSmall } from 'baseui/typography';

function Footer() {
  const [css, theme] = useStyletron();
  return (
    <div className={css({
        backgroundColor: theme.colors.primaryB,
        width: 100,
        paddingTop: theme.sizing.scale800,
        paddingBottom: theme.sizing.scale800,
        boxShadow: 'rgb(0 0 0 / 8%) 0px -1px 0px'
        })}>
        <Grid behavior={BEHAVIOR.fixed} >
            <Cell span={6}>
                <LabelSmall className={css({ color: theme.colors.contentPrimary})}>© 2021 Maxim Nawangwe</LabelSmall>
                <div style={{marginTop: 10}}>
                <SocialIcon style={{width: 30, height: 30}} network='twitter' bgColor={theme.colors.contentPrimary} fgColor={theme.colors.primaryB}/>
                <SocialIcon style={{width: 30, height: 30, marginLeft: 10}} network='instagram' bgColor={theme.colors.contentPrimary} fgColor={theme.colors.primaryB}/>
                </div>
            </Cell>
            <Cell span={6}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <LabelSmall className={css({ color: theme.colors.contentPrimary})}>Created with OpenSea whitelable template</LabelSmall>
                    <div style={{marginTop: 10}}/>
                    <SocialIcon style={{width: 30, height: 30, float: 'right'}} network='github' bgColor={theme.colors.contentPrimary} fgColor={theme.colors.primaryB}/>
                </div>
            </Cell>
        </Grid>
    </div>
  );
}

export default Footer;