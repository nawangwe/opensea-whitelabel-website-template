import * as React from 'react';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import sizeMe, { SizeMeProps } from 'react-sizeme'
import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { Order, OrderSide } from 'opensea-js/lib/types';
import Page from '../../../containers/page';
import { HeadingXLarge, ParagraphLarge } from 'baseui/typography';
import { ListItem, ListItemLabel } from 'baseui/list';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from 'baseui/modal';
import { Spinner } from 'baseui/spinner';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { getPriceLabel } from '../../../helpers/utilities';
import Context from '../../../context';

interface GalleryItemDetailsProps extends SizeMeProps {
  order: Order
}

export async function getServerSideProps({ params }) {

  const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })

  const response: Order = await seaport.api.getOrder({
    asset_contract_address: params.tokenAddress,
    token_id: params.tokenId,
    side: OrderSide.Sell
  })

  const order = JSON.parse(JSON.stringify(response))

  return { props: { order: order } }
}

export const sum = (a: number, b: number) => a + b;

function GalleryItemDetails({ order, size }: GalleryItemDetailsProps) {
  const [css] = useStyletron();
  const [showTransactionModal, setShowTransactionModal] = React.useState(false)
  const [creatingOrder, setCreatingOrder] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const { addressValue, providerValue, connectedValue } = React.useContext(Context)
  const [address] = addressValue
  const [provider] = providerValue
  const [connected] = connectedValue
  const [seaport, setSeaport] = React.useState(null)

  React.useEffect(() => {
    if (provider != null) {
      setSeaport(new OpenSeaPort(provider, {
        networkName: Network.Main
      }))
    } else {
      setSeaport(null)
    }
  }, [provider])

  const owner = order.asset
    ? order.asset.owner
    : order.assetBundle.assets[0].owner

  const initiatePurchase = (order) => {
    const buyAsset = async () => {
      if (owner.address != address) {
        try {
          setCreatingOrder(true)
          setShowTransactionModal(true)
          await seaport.fulfillOrder({ order, accountAddress: address })
        } catch (error) {
          console.log(error)
          setErrorMessage(error.message)
        } finally {
          setCreatingOrder(false)
        }
      }
    }
    buyAsset()
  }


  return (
    <div>
      <Page pageRoute="gallery">
        <Modal isOpen={showTransactionModal} closeable={false}>
          <ModalHeader>Creating Order</ModalHeader>
          <ModalBody>
            {creatingOrder && <Spinner />}
            {errorMessage && `${errorMessage}`}
          </ModalBody>
          {!creatingOrder &&<ModalFooter>
            <ModalButton onClick={() => { 
              setShowTransactionModal(false); 
              setErrorMessage(null) }}>Close</ModalButton>
          </ModalFooter>}
        </Modal>
        <Grid behavior={BEHAVIOR.fixed} gridMargins={0} gridGutters={100}>
          <Cell
            span={6}
            overrides={{
              Cell: {
                style: (_) => ({
                  backgroundColor: 'rgba(0, 0, 0, 0.05)'
                })
              }
            }}>
            <img
              style={{ height: '90vh', width: '100%', objectFit: 'contain' }}
              src={order.asset.imageUrl.replace('s250', 's600')} />
          </Cell>
          <Cell span={6}>
            <HeadingXLarge
              overrides={{ Block: { props: { $marginTop: ['scale800', 'scale800', 'scale800', 0] } } }}
            >
              <Block></Block>
              {order.asset.name}
            </HeadingXLarge>
            <ParagraphLarge>{order.asset.description}</ParagraphLarge>
            <ul
              className={css({
                paddingLeft: 0,
                paddingRight: 0,
              })}>
              <ListItem overrides={{ Content: { style: { paddingLeft: 0, marginLeft: 0 } } }}>
                <ListItemLabel description="Collection">
                  {order.asset.collection.name}
                </ListItemLabel>
              </ListItem>
              <ListItem overrides={{ Content: { style: { paddingLeft: 0, marginLeft: 0 } } }}>
                <ListItemLabel description="Created by">
                  {order.makerAccount.user.username}
                </ListItemLabel>
              </ListItem>
              <ListItem overrides={{ Content: { style: { paddingLeft: 0, marginLeft: 0 } } }}>
                <ListItemLabel description="Price">
                  {getPriceLabel(order)}
                </ListItemLabel>
              </ListItem>
            </ul>
            {
              connected ? <Button disabled={owner.address == address} onClick={() => { initiatePurchase(order) }}>{owner.address == address ? "You already own this piece" : `Buy for ${getPriceLabel(order)}`}</Button>
                : <Button kind='secondary'>Connect Wallet</Button>
            }
          </Cell>
        </Grid>
      </Page>
    </div>
  );
};
export default sizeMe()(GalleryItemDetails);
