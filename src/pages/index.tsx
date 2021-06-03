import * as React from 'react';
import {useStyletron} from 'baseui';
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
import { Order } from 'opensea-js/lib/types';
import Page from '../containers/page';
import NFTCard from '../components/nftcard';

interface IndexProps extends SizeMeProps {
  orders: Order[]
}

export async function getStaticProps() {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  /**
   * cast OpenSeaAssetQuery to any since collection is not included in the api library
   */
  const response: { orders: Order[], count: number; } = await seaport.api.getOrders({
    owner: process.env.OPEN_SEA_WALLET_ADDRESS,
    limit: 3
  })

  /**
   * Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/
   * solution from https://github.com/vercel/next.js/discussions/11209#discussioncomment-38480
   */
  const orders = JSON.parse(JSON.stringify(response)).orders

  return { props: { orders: orders } }
}

function Index ({orders, size}: IndexProps) {

  const [css, theme] = useStyletron()

  return (
    <div>
        <Page pageRoute="home">
          <Paragraph1 marginTop="scale1000">
            {process.env.NEXT_PUBLIC_INTRODUCTORY_TEXT}
            </Paragraph1>

          <HeadingSmall>Gallery</HeadingSmall>
          {/* <HeaderImage /> */}
          <StackGrid
            style={{marginTop: 50, zIndex: 0}}
            columnWidth={size.width <= 768 ? '100%' : '33.33%'}
            gutterWidth={50}
            gutterHeight={50}
            appearDelay={500}
          >
            {orders.map(order => {
            return(
              <div key={order.asset.tokenId}>
                <NFTCard order={order}/>
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
