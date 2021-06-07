import * as React from 'react'
import {Grid, Cell, BEHAVIOR} from 'baseui/layout-grid'
import {SizeMeProps, withSize} from 'react-sizeme'
import * as Web3 from 'web3'
import {OpenSeaPort, Network} from 'opensea-js'
import {OpenSeaAsset} from 'opensea-js/lib/types'
import Page from '../../../containers/page'
import {HeadingXLarge, ParagraphLarge} from 'baseui/typography'
import {ListItem, ListItemLabel} from 'baseui/list'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import {Tag, VARIANT} from 'baseui/tag'
import {Spinner} from 'baseui/spinner'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {getPriceLabel, truncate} from '../../../helpers/utilities'
import Context from '../../../context'
import dynamic from 'next/dynamic'

const ReactViewer = dynamic(() => import('react-viewer'), {ssr: false})

interface GalleryItemDetailsProps extends SizeMeProps {
  asset: OpenSeaAsset
}

export async function getServerSideProps ({params}) {
  const provider = new Web3.default.providers.HttpProvider(
    'https://mainnet.infura.io',
  )

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
  })

  const response: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress: params.tokenAddress,
    tokenId: params.tokenId,
  })

  const asset = JSON.parse(JSON.stringify(response))

  return {props: {asset: asset}}
}

function GalleryItemDetails ({asset, size}: GalleryItemDetailsProps) {
  const [css] = useStyletron()
  const [showTransactionModal, setShowTransactionModal] = React.useState(false)
  const [creatingOrder, setCreatingOrder] = React.useState(false)
  const [dialogMessage, setDialogMessage] = React.useState(null)
  const {addressValue, providerValue, connectedValue} = React.useContext(
    Context,
  )
  const [address] = addressValue
  const [provider] = providerValue
  const [connected] = connectedValue
  const [seaport, setSeaport] = React.useState(null)
  const [showImageViewer, setShowImageViewer] = React.useState(false)

  const sellOrder = asset.sellOrders.length > 0 ? asset.sellOrders[0] : null
  const buyOrder = asset.buyOrders.length > 0 ? asset.buyOrders[0] : null

  React.useEffect(() => {
    if (provider != null) {
      setSeaport(
        new OpenSeaPort(provider, {
          networkName: Network.Main,
        }),
      )
    } else {
      setSeaport(null)
    }
  }, [provider])

  const initiatePurchase = order => {
    const buyAsset = async () => {
      if (asset.owner.address != address) {
        try {
          setCreatingOrder(true)
          setShowTransactionModal(true)
          await seaport.fulfillOrder({order, accountAddress: address})
          setDialogMessage('Order was a success!')
        } catch (error) {
          console.log(error)
          setDialogMessage(error.message)
        } finally {
          setCreatingOrder(false)
        }
      }
    }
    buyAsset()
  }

  return (
    <div>
      <Page pageRoute='gallery'>
        <ReactViewer
          visible={showImageViewer}
          onClose={() => {
            setShowImageViewer(false)
          }}
          images={[{src: asset.imageUrl.replace('s250', 's600')}]}
          noToolbar={true}
          noNavbar={true}
        />
        <Modal isOpen={showTransactionModal} closeable={false}>
          <ModalHeader>Creating Order</ModalHeader>
          <ModalBody>
            {creatingOrder && <Spinner />}
            {dialogMessage && `${dialogMessage}`}
          </ModalBody>
          {!creatingOrder && (
            <ModalFooter>
              <ModalButton
                onClick={() => {
                  setShowTransactionModal(false)
                  setDialogMessage(null)
                }}
              >
                Close
              </ModalButton>
            </ModalFooter>
          )}
        </Modal>
        <Grid
          behavior={BEHAVIOR.fixed}
          gridMargins={0}
          gridGutters={100}
          gridColumns={[6, 6, 12, 12]}
        >
          <Cell
            span={6}
            overrides={{
              Cell: {
                style: _ => ({
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  'padding-left': '0px !important',
                  'padding-right': '0px !important',
                }),
              },
            }}
          >
            <img
              onClick={() => {
                setShowImageViewer(true)
              }}
              style={{maxHeight: '90vh', width: '100%', objectFit: 'contain'}}
              src={asset.imageUrl.replace('s250', 's600')}
            />
          </Cell>
          <Cell span={6}>
            <HeadingXLarge
              overrides={{
                Block: {
                  props: {$marginTop: ['scale800', 'scale800', 'scale800', 0]},
                },
              }}
            >
              <Block></Block>
              {asset.name}
            </HeadingXLarge>
            <ParagraphLarge>{asset.description}</ParagraphLarge>
            <ul
              className={css({
                paddingLeft: 0,
                paddingRight: 0,
              })}
            >
              <ListItem
                overrides={{Content: {style: {paddingLeft: 0, marginLeft: 0}}}}
              >
                <ListItemLabel description='Collection'>
                  {asset.collection.name}
                </ListItemLabel>
              </ListItem>

              {asset.lastSale && (
                <ListItem
                  overrides={{
                    Content: {style: {paddingLeft: 0, marginLeft: 0}},
                  }}
                >
                  <ListItemLabel description='Last Buyer'>
                    {asset.lastSale.transaction.fromAccount.user
                      ? asset.lastSale.transaction.fromAccount.user.username
                      : truncate(
                          asset.lastSale.transaction.fromAccount.address,
                          20,
                        )}
                  </ListItemLabel>
                </ListItem>
              )}

              {asset.sellOrders.length > 0 && (
                <ListItem
                  overrides={{
                    Content: {style: {paddingLeft: 0, marginLeft: 0}},
                  }}
                >
                  <ListItemLabel description='Price'>
                    {getPriceLabel(asset.sellOrders[0])}
                  </ListItemLabel>
                </ListItem>
              )}
            </ul>

            {(() => {
              if (connected && asset.lastSale) {
                if (
                  asset.lastSale.transaction.fromAccount.address.toLowerCase() === address.toLowerCase() || 
                  (sellOrder && sellOrder.makerAccount.address.toLowerCase() === address.toLowerCase())
                ) {
                  return (
                    <Tag
                      closeable={false}
                      variant={VARIANT.outlined}
                      kind='positive'
                    >
                      You own this item
                    </Tag>
                  )
                }
              }
            })()}

            {(() => {
              if (sellOrder) {
                if (connected) {
                  if (
                    (asset.lastSale &&
                      asset.lastSale.transaction.fromAccount.address ===
                        address.toLowerCase()) ||
                    sellOrder.makerAccount === address
                  ) {
                    return <div />
                  } else {
                    return (
                      <Button
                        disabled={asset.owner.address == address}
                        onClick={() => {
                          initiatePurchase(sellOrder)
                        }}
                      >{`Buy for ${getPriceLabel(sellOrder)}`}</Button>
                    )
                  }
                } else {
                  return <Button kind='secondary'>Connect Wallet</Button>
                }
              }
            })()}
          </Cell>
        </Grid>
      </Page>
    </div>
  )
}
export default withSize()(GalleryItemDetails)
