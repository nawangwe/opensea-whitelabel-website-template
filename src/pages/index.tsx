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

export async function getServerSideProps() {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  const response: { orders: Order[], count: number; } = await seaport.api.getOrders({
    owner: process.env.OPEN_SEA_WALLET_ADDRESS,
    include_invalid: false
  } as any)

  const orders = JSON.parse(JSON.stringify(response)).orders

  return { props: { orders: orders.filter((v,i,a)=>a.findIndex(t=>(t.asset.tokenId === v.asset.tokenId))===i) }} // getting rid of duplicate entires in the order book
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
            monitorImagesLoaded={true}
          >
            {orders.slice(0,3).map(order => {
            return(
              <div key={order.createdTime.toString()}>
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
