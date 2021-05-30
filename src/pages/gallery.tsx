import * as React from 'react';
import StackGrid from "react-stack-grid";
import sizeMe, { SizeMeProps } from 'react-sizeme'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { Order } from 'opensea-js/lib/types';
import Page from '../containers/page';
import NFTCard from '../components/nftcard';

interface GalleryProps extends SizeMeProps {
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
    owner: process.env.OPEN_SEA_WALLET_ADDRESS
  })

  /**
   * Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/
   * solution from https://github.com/vercel/next.js/discussions/11209#discussioncomment-38480
   */
  const orders = JSON.parse(JSON.stringify(response)).orders

  return { props: { orders: orders } }
}

export const sum = (a: number, b: number) => a + b;

function Gallery ({orders, size}: GalleryProps) {
  return (
    <div>
        <Page pageRoute="gallery">
          {/* <HeaderImage /> */}
          <StackGrid
            style={{marginTop: 50, zIndex: 0}}
            columnWidth={size.width <= 768 ? '50%' : '33.33%'}
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
        </Page>
    </div>
  );
};
export default sizeMe()(Gallery);
