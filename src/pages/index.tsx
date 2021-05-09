import * as React from 'react';
import { AppNavBar } from 'baseui/app-nav-bar';
import { Card, StyledBody } from "baseui/card";
import {
  Paragraph1
} from 'baseui/typography';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import StackGrid from "react-stack-grid";
import sizeMe, { SizeMeProps } from 'react-sizeme'
import Link from 'next/link'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Page from '../containers/page';
import Footer from '../components/footer';

interface IndexProps extends SizeMeProps {
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

function Index ({assets, size}: IndexProps) {
  return (
    <div>
        <Page>
          <Paragraph1 marginTop="scale1000">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Paragraph1>
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
                      headerImage={asset.imageUrl}
                      title={asset.name}>
                      <StyledBody>
                        {asset.description}
                      </StyledBody>
                      {/* <StyledAction>
                        <Button
                          overrides={{
                            BaseButton: { style: { width: "100%" } }
                          }}
                        >
                          Button Label
                        </Button>
                      </StyledAction> */}
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
export default sizeMe()(Index);
