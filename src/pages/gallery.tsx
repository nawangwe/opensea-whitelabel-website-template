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

export async function getServerSideProps() {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

   const response: { orders: Order[], count: number; } = await seaport.api.getOrders({
    maker: process.env.OPEN_SEA_WALLET_ADDRESS,
  })

  const orders = JSON.parse(JSON.stringify(response)).orders

  return { props: { orders: orders.filter((v,i,a)=>a.findIndex(t=>(t.asset.tokenId === v.asset.tokenId))===i) }} // getting rid of duplicate entires in the order book
}

export const sum = (a: number, b: number) => a + b;

function Gallery ({orders, size}: GalleryProps) {
  return (
    <div>
        <Page pageRoute="gallery">
          {/* <HeaderImage /> */}
          <StackGrid
            style={{marginTop: 50, zIndex: 0}}
            columnWidth={size.width <= 768 ? '100%' : '33.33%'}
            gutterWidth={50}
            gutterHeight={50}
            monitorImagesLoaded={true}
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
