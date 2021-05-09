import * as React from 'react';
import { Card, StyledBody } from "baseui/card";
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import sizeMe, { SizeMeProps } from 'react-sizeme'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Page from '../../../containers/page';

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

function GalleryItemDetails ({asset, size}: GalleryItemDetailsProps) {

  const [mainItems, setMainItems] = React.useState([
    { label: "Gallery", active: true },
    { label: "About" }
  ]);

  return (
    <div>
      <Page pageRoute="gallery">
        <Grid behavior={BEHAVIOR.fixed}>
          <Cell span={6}>
            <Card 
            overrides={{HeaderImage: {style: {width: '95%', padding: '2.5%'}}}}
            headerImage={asset.imageUrl}
            title={asset.name}>
              <StyledBody>
                {asset.description}
              </StyledBody>
            </Card>
          </Cell>
        </Grid>
      </Page>
    </div>
  );
};
export default sizeMe()(GalleryItemDetails);
