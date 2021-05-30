import * as React from 'react';
import sizeMe, { SizeMeProps } from 'react-sizeme'

import {useStyletron} from 'baseui';
import Page from '../containers/page';
import { HeadingXLarge, ParagraphLarge } from 'baseui/typography';
import { ListItem, ListItemLabel } from 'baseui/list';
import { FaCheck } from 'react-icons/fa'

interface AboutProps extends SizeMeProps {
}

function About ({size}: AboutProps) {

  const [css, theme] = useStyletron();
  return (
    <div>
        <Page pageRoute="about">
        <HeadingXLarge>Nextjs + Base Web + TypeScript + OpenSea</HeadingXLarge>
        <ParagraphLarge>This is a Scaffold for an opensea marketplace using opensea-js. Based on the opinionated scaffold by tajo.</ParagraphLarge>
        <ParagraphLarge>It&#39;s still in very early stages of development. I&#39;m relatively new to web development so contributions are more than welcome.</ParagraphLarge>
        <ParagraphLarge>With Nextjs we can decide to do either SSR (Server Side Rendering) or Static Generation. This page currently uses Server Side Rendering but might be more beneficial to user Static rendering for users more interested in cost savings. However, this would need a rebuilt everytime an important aspect of the website is updated.</ParagraphLarge>
        <ParagraphLarge>The main goal of this project is to create a template based on baseui that any artists can use to display and sell their NFTS however they want to.</ParagraphLarge>
        <ul>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>OpenSeaJS</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>extjs</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>Base Web</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>Styletron</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>Jest</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>Eslint</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>Prettier</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>TypeScript</ListItemLabel></ListItem>
        <ListItem artwork={() => <FaCheck color={theme.colors.contentPrimary}/>}><ListItemLabel>React Social Icons</ListItemLabel></ListItem>
        </ul>
        </Page>
    </div>
  );
};
export default sizeMe()(About);
