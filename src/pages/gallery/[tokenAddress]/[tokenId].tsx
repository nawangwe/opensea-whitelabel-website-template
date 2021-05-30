import * as React from 'react';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import sizeMe, { SizeMeProps } from 'react-sizeme'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Page from '../../../containers/page';
import { HeadingLarge, HeadingXLarge, ParagraphLarge, ParagraphMedium } from 'baseui/typography';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';

interface GalleryItemDetailsProps extends SizeMeProps {
  asset: OpenSeaAsset
}

export async function getServerSideProps({ params }) {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  /**
   * cast OpenSeaAssetQuery to any since collection is not included in the api library
   */
  const response: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress: params.tokenAddress,
    tokenId: params.tokenId
  })

  /**
   * Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/
   * solution from https://github.com/vercel/next.js/discussions/11209#discussioncomment-38480
   */
  const asset = JSON.parse(JSON.stringify(response))

  return { props: { asset: asset } }
}

export const sum = (a: number, b: number) => a + b;

function GalleryItemDetails({ asset, size }: GalleryItemDetailsProps) {
  const [css] = useStyletron();

  return (
    <div>
      <Page pageRoute="gallery">
        <Grid behavior={BEHAVIOR.fixed} gridMargins={0} gridGutters={100}>
          <Cell
            span={6}
            overrides={{
              Cell: {
                style: (_) => ({
                  backgroundColor: 'rgba(0, 0, 0, 0.05)'
                })
              }
            }}>
            <img
              style={{ height: '90vh', width: '100%', objectFit: 'contain' }}
              src={asset.imageUrl.replace('s250', 's600')} />
          </Cell>
          <Cell span={6}>
            <HeadingXLarge
              overrides={{ Block: { props: { $marginTop: ['scale800', 'scale800', 'scale800', 0] } } }}
            >
              <Block></Block>
              {asset.name}
            </HeadingXLarge>
            <ParagraphLarge>{asset.description}</ParagraphLarge>
            <ul
              className={css({
                paddingLeft: 0,
                paddingRight: 0,
              })}>
              <ListItem overrides={{Content: {style: {paddingLeft: 0, marginLeft: 0}}}}>
                <ListItemLabel description="Collection">
                  {asset.collection.name}
                </ListItemLabel>
              </ListItem>
              {asset.owner.user.username != "NullAddress" ?
                <ListItem overrides={{Content: {style: {paddingLeft: 0, marginLeft: 0}}}}>
                  <ListItemLabel description="Current Owner">
                    {asset.owner.user.username}
                  </ListItemLabel>
                </ListItem>
                : 
                <ListItem overrides={{Content: {style: {paddingLeft: 0, marginLeft: 0}}}}>
                <ListItemLabel description="Current Owner">
                  NFT has no owner yet
                </ListItemLabel>
              </ListItem>
              }
            </ul>
            <Button $style={{float: 'right'}}>Purchase on OpenSea</Button>
          </Cell>
        </Grid>
      </Page>
    </div>
  );
};
export default sizeMe()(GalleryItemDetails);
