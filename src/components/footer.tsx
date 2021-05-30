import React from 'react';
import {useStyletron} from 'baseui';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
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
                <FaTwitter style={{width: 30, height: 30}} color={theme.colors.contentPrimary}/>
                <FaInstagram style={{width: 30, height: 30, marginLeft: 10}} color={theme.colors.contentPrimary}/>
                </div>
            </Cell>
            <Cell span={6}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <LabelSmall className={css({ color: theme.colors.contentPrimary})}>Created with OpenSea whitelable template</LabelSmall>
                    <div style={{marginTop: 10}}/>
                    <FaGithub style={{width: 30, height: 30, float: 'right'}} color={theme.colors.contentPrimary}/>
                </div>
            </Cell>
        </Grid>
    </div>
  );
}

export default Footer;