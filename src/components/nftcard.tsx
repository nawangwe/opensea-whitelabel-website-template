import * as React from 'react';
import { useStyletron } from 'baseui';
import { Order } from 'opensea-js/lib/types';
import { Card } from 'baseui/card';
import { Cell, Grid } from 'baseui/layout-grid';
import { LabelLarge } from 'baseui/typography';
import { getPriceLabel } from '../helpers/utilities';
import Link from 'next/link';

interface NFTCardProps {
  order: Order
}

const NFTCard = (props: NFTCardProps) => {
  const { order } = props
  const [css, theme] = useStyletron()
  const [hovered, setHovered] = React.useState(false)
  return (
    <Link href={`/gallery/${order.asset.tokenAddress}/${order.asset.tokenId}`}>
      <Card
        overrides={{
          Root: {
            props: {
              onMouseEnter: () => {setHovered(true)},
              onMouseLeave: () => {setHovered(false)}
            },
            style: ({$theme}) => ({ 
              backgroundColor: hovered ? $theme.colors.borderOpaque : '',
              cursor: 'pointer'
            })
          },
          HeaderImage: { style: { width: '95%', padding: '2.5%' } }
        }}
        headerImage={order.asset.imageUrl.replace('s250', 's600')}
        title={
          <Grid gridMargins={0} gridGutters={0} overrides={{ Grid: { style: { flexWrap: 'unset' } } }}>
            <Cell span={8}>
              <LabelLarge>{order.asset.name}</LabelLarge>
            </Cell>
            <Cell span={4}>
              <LabelLarge className={css({ float: 'right' })}>{getPriceLabel(order)}</LabelLarge>
            </Cell>
          </Grid>
        }>
      </Card>
    </Link>
  )
};

export default NFTCard