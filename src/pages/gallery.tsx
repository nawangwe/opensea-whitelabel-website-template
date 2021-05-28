import * as React from 'react';
import { Card, StyledAction, StyledBody } from "baseui/card";
import {
  Paragraph1
} from 'baseui/typography';
import StackGrid from "react-stack-grid";
import sizeMe, { SizeMeProps } from 'react-sizeme'
import Link from 'next/link'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Page from '../containers/page';
import { Button } from 'baseui/button';

interface GalleryProps extends SizeMeProps {
  assets: OpenSeaAsset[]
}

export async function getStaticProps() {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  /**
   * cast OpenSeaAssetQuery to any since collection is not included in the api library
   */
  const response: { assets: OpenSeaAsset[]; estimatedCount: number; } = await seaport.api.getAssets({
    owner: process.env.OPEN_SEA_WALLET_ADDRESS,
    collection: process.env.OPEN_SEA_COLLECTION_SLUG
  } as any)

  /**
   * Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/
   * solution from https://github.com/vercel/next.js/discussions/11209#discussioncomment-38480
   */
  const assets = JSON.parse(JSON.stringify(response)).assets

  return { props: { assets: assets } }
}

export const sum = (a: number, b: number) => a + b;

function Gallery ({assets, size}: GalleryProps) {
  return (
    <div>
        <Page pageRoute="gallery">
          {/* <HeaderImage /> */}
          <StackGrid
            style={{marginTop: 50}}
            columnWidth={size.width <= 768 ? '50%' : '33.33%'}
            gutterWidth={50}
            gutterHeight={50}
            appearDelay={500}
          >
            {assets.map(asset => {
            return(
              <div key={asset.tokenId}>
                <Link href={`/gallery/${asset.tokenAddress}/${asset.tokenId}`}>
                    <Card 
                      overrides={{HeaderImage: {style: {width: '95%', padding: '2.5%'}}}}
                      headerImage={asset.imageUrl.replace('s250', 's600')}
                      title={asset.name}>
                    </Card>
                </Link>
              </div>
            )
          })}
          </StackGrid>
        </Page>
    </div>
  );
};
export default sizeMe()(Gallery);
