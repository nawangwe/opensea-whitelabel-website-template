import * as React from 'react';
import {useStyletron} from 'baseui';
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import {
  HeadingSmall,
  Paragraph1
} from 'baseui/typography';
import StackGrid from "react-stack-grid";
import sizeMe, { SizeMeProps } from 'react-sizeme'
import Link from 'next/link'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Page from '../containers/page';

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
    collection: process.env.OPEN_SEA_COLLECTION_SLUG,
    limit: 4
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

  const [css, theme] = useStyletron()

  return (
    <div>
        <Page pageRoute="home">
          <Paragraph1 marginTop="scale1000">
            I've always had a keen interest in Photography. This interest peaked in the early 2010's, when I got myself a trusty CanonG7x and guide to photography by the National Geographic channel.
            I began exploring how I can use the light around me to create art, hence putting my focus away from live subjects. The hobby slowly faded with time, but every now and then, I take a good picture that I believe is worth something.
            This website hosts my best pictures taken within the last 10 years of my life in and around Malaysia, it also serves as an open source OpenSea website template I wish to share with the world. I hope you find it useful in the pursue of your endeavors.
          </Paragraph1>

          <HeadingSmall>Gallery</HeadingSmall>
          {/* <HeaderImage /> */}
          <StackGrid
            style={{marginTop: 50, zIndex: 0}}
            columnWidth={size.width <= 768 ? '50%' : '33.33%'}
            gutterWidth={50}
            gutterHeight={50}
            appearDelay={500}
          >
            {assets.slice(0, size.width >= 768 ? 3 : 4).map(asset => {
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
          <div className={css({
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          })}>
            <Link href="/gallery">
              <Button>
                See more
              </Button>
            </Link>
          </div>
        </Page>
    </div>
  );
};
export default sizeMe()(Index);
