import * as React from 'react'
import {useStyletron} from 'baseui'
import {OpenSeaAsset} from 'opensea-js/lib/types'
import {Card} from 'baseui/card'
import {Cell, Grid} from 'baseui/layout-grid'
import {LabelLarge} from 'baseui/typography'
import {getPriceLabel} from '../helpers/utilities'
import Link from 'next/link'
import { Tag, VARIANT } from 'baseui/tag'

interface NFTCardProps {
  asset: OpenSeaAsset
}

const NFTCard = (props: NFTCardProps) => {
  const {asset} = props
  const [css, theme] = useStyletron()
  const [hovered, setHovered] = React.useState(false)
  return (
    <Link href={`/gallery/${asset.tokenAddress}/${asset.tokenId}`}>
      <Card
        overrides={{
          Root: {
            props: {
              onMouseEnter: () => {
                setHovered(true)
              },
              onMouseLeave: () => {
                setHovered(false)
              },
            },
            style: ({$theme}) => ({
              backgroundColor: hovered ? $theme.colors.borderOpaque : '',
              cursor: 'pointer',
            }),
          },
          HeaderImage: {style: {width: '95%', padding: '2.5%'}},
        }}
        headerImage={asset.imageUrl.replace('s250', 's600')}
        title={
          <Grid
            gridMargins={0}
            gridGutters={0}
            overrides={{Grid: {style: {flexWrap: 'unset'}}}}
          >
            <Cell span={8}>
              <LabelLarge>{asset.name}</LabelLarge>
            </Cell>
            {asset.sellOrders && (
              <Cell span={4}>
                <LabelLarge className={css({float: 'right'})}>
                  {getPriceLabel(asset.sellOrders[0])}
                </LabelLarge>
              </Cell>
            )}
            {!asset.sellOrders 
            && asset.lastSale 
            && (
              <Cell span={4}>
                <LabelLarge className={css({float: 'right', color: 'green'})}>
                  SOLD
                </LabelLarge>
              </Cell>
            )}
          </Grid>
        }
      ></Card>
    </Link>
  )
}

export default NFTCard
