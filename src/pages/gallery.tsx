import * as React from 'react'
import StackGrid from 'react-stack-grid'
import {Button} from 'baseui/button'
import {ButtonGroup, MODE} from 'baseui/button-group'
import {SizeMeProps, withSize} from 'react-sizeme'

import * as Web3 from 'web3'
import {OpenSeaPort, Network} from 'opensea-js'
import {OpenSeaAsset} from 'opensea-js/lib/types'
import Page from '../containers/page'
import NFTCard from '../components/nftcard'

interface GalleryProps extends SizeMeProps {
  assets: OpenSeaAsset[]
}

enum LISTINGMODE {
  ALL = 0,
  BUY = 1,
  SOLD = 2,
}

export async function getServerSideProps () {
  const provider = new Web3.default.providers.HttpProvider(
    'https://mainnet.infura.io',
  )

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
  })

  const response: {
    assets: OpenSeaAsset[]
    estimatedCount: number
  } = await seaport.api.getAssets({
    collection_slug: process.env.OPEN_SEA_COLLECTION_SLUG,
  } as any)

  const assets = JSON.parse(JSON.stringify(response)).assets

  // sort items not on sale to bottom
  assets.sort(function (a, b) {
    if (a.sellOrders != null) return -1
    else if (a.sellOrders === null) return 1
  })

  return {props: {assets: assets}}
}

function Gallery ({assets, size}: GalleryProps) {
  const [showSellOrders, setShowSellOrders] = React.useState(false)
  const [selectedListingMode, setSelectedListingMode] = React.useState<
    LISTINGMODE
  >(0)

  return (
    <div>
      <Page pageRoute='gallery'>
        <div>
          <ButtonGroup
            mode={MODE.radio}
            selected={selectedListingMode}
            onClick={(_event, index) => {
              setSelectedListingMode(index)
            }}
            overrides={{Root: {style: {justifyContent: 'flex-end'}}}}
          >
            <Button>All</Button>
            <Button>On Sale / Auction</Button>
            <Button>Sold</Button>
          </ButtonGroup>
        </div>
        <StackGrid
          style={{marginTop: 25, zIndex: 0}}
          columnWidth={size.width <= 768 ? '100%' : '33.33%'}
          gutterWidth={50}
          gutterHeight={50}
          monitorImagesLoaded={true}
        >
          {assets
            .filter(asset => {
              if (selectedListingMode === LISTINGMODE.ALL) {
                return true
              } else if (selectedListingMode === LISTINGMODE.BUY) {
                if (asset.sellOrders === null) return false
                else return true
              } else if (selectedListingMode === LISTINGMODE.SOLD) {
                if (asset.sellOrders === null) return true
                else return false
              }
            })
            .map(asset => {
              return (
                <div key={asset.tokenId}>
                  <NFTCard asset={asset} />
                </div>
              )
            })}
        </StackGrid>
      </Page>
    </div>
  )
}
export default withSize()(Gallery)
