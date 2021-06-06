import * as React from 'react'
import {useStyletron} from 'baseui'
import {Button} from 'baseui/button'
import {HeadingSmall, Paragraph1} from 'baseui/typography'
import StackGrid from 'react-stack-grid'
import {SizeMeProps, withSize} from 'react-sizeme'
import Link from 'next/link'
import * as Web3 from 'web3'
import {OpenSeaPort, Network} from 'opensea-js'
import {OpenSeaAsset} from 'opensea-js/lib/types'
import Page from '../containers/page'
import NFTCard from '../components/nftcard'

interface IndexProps extends SizeMeProps {
  assets: OpenSeaAsset[]
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

function Index ({assets, size}: IndexProps) {
  const [css, theme] = useStyletron()

  return (
    <Page pageRoute='home'>
      <Paragraph1 marginTop='scale1000'>
        {process.env.NEXT_PUBLIC_INTRODUCTORY_TEXT}
      </Paragraph1>

      <HeadingSmall>Gallery</HeadingSmall>
      <StackGrid
        style={{marginTop: 50, zIndex: 0}}
        columnWidth={size.width <= 768 ? '100%' : '33.33%'}
        gutterWidth={50}
        gutterHeight={50}
        monitorImagesLoaded={true}
      >
        {assets.slice(0, 3).map(asset => {
          return (
            <div key={asset.tokenId}>
              <NFTCard asset={asset} />
            </div>
          )
        })}
      </StackGrid>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
        })}
      >
        <Link href='/gallery'>
          <Button>See more</Button>
        </Link>
      </div>
    </Page>
  )
}
export default withSize()(Index)
