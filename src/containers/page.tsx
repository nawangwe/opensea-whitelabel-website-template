import * as React from 'react';
import { useRouter } from "next/router";
import { AppNavBar } from 'baseui/app-nav-bar';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import Footer from '../components/footer';
import { FaLightbulb } from 'react-icons/fa';
import useDarkMode from 'use-dark-mode'
import { HeadingSmall, LabelLarge } from 'baseui/typography';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getChainData } from '../helpers/utilities';
import Context from '../context';
import { SizeMeProps, withSize } from 'react-sizeme'

interface PageProps extends SizeMeProps {
  children?: React.ReactNode
  pageRoute: String
}

function Page({ children, pageRoute, size }: PageProps) {

  var web3Modal = React.useRef(null);

  const router = useRouter()
  const [css, theme] = useStyletron();
  const { addressValue, providerValue, connectedValue, web3Value } = React.useContext(Context)
  const [address, setAddress] = addressValue
  const [web3, setWeb3] = web3Value
  const [provider, setProvider] = providerValue
  const [connected, setConnected] = connectedValue
  const [networkId, setNetworkId] = React.useState(1)
  const [chainId, setChainId] = React.useState(1)
  const [mainItems, setMainItems] = React.useState([
    { label: "Home", active: pageRoute.toLowerCase() === 'home' },
    { label: "Gallery", active: pageRoute.toLowerCase() === 'gallery' },
    { label: "Connect Wallet" },
    { label: "Toggle Dark Mode" }
  ]);
  const darkMode = useDarkMode()

  React.useEffect(() => {
    web3Modal.current = new Web3Modal({
      network: getNetwork(),
      cacheProvider: true,
      providerOptions: getProviderOptions()
    });
    if (web3Modal.current.cachedProvider) {
      onConnect();
    }
  }, []);

  const initWeb3 = (provider: any) => {
    const web3: any = new Web3(provider)
    return web3
  }

  const onConnect = async () => {
    const provider = await web3Modal.current.connect();

    await subscribeProvider(provider);

    const web3: any = initWeb3(provider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();

    await setWeb3(web3)
    await setProvider(provider)
    await setConnected(true)
    await setAddress(address)
    await setChainId(chainId)
    await setNetworkId(networkId)
  }

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      await setAddress(accounts[0])
    });
    provider.on("chainChanged", async (chainId: number) => {
      const networkId = await web3.eth.net.getId();
      await setChainId(chainId)
      await setNetworkId(networkId)
    });

    provider.on("networkChanged", async (networkId: number) => {
      const chainId = await web3.eth.chainId();
      await setChainId(chainId)
      await setNetworkId(networkId)
    });
  };

  const getNetwork = () => getChainData(chainId).network;

  const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID
        }
      }
    };
    return providerOptions;
  };

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.current.clearCachedProvider();
    await setWeb3(null)
    await setProvider(null)
    await setConnected(false)
    await setAddress("")
    await setChainId(1)
    await setNetworkId(1)
  };

  return (
    <div className={css({
      backgroundColor: theme.colors.primaryB,
      minHeight: '100vh'
    })}>
      <AppNavBar
        title={process.env.NEXT_PUBLIC_TITLE}
        mainItems={mainItems}
        mapItemToNode={(item) => {
          if (item.label == "Toggle Dark Mode") {
            return <FaLightbulb style={{ width: 30, height: 30 }} color={theme.colors.contentPrimary} />
          } else if (item.label == "Connect Wallet") {
            if (connected) {
              return <Button size='compact' shape='pill' >{address.substring(0, 10) + '...'}</Button>
            }
            else
              return <Button size='compact' shape='pill' kind='secondary'>Connect Wallet</Button>
          }
          else return <LabelLarge>{item.label}</LabelLarge>
        }}
        onMainItemSelect={(item) => {
          if (item.label == "Toggle Dark Mode") {
            darkMode.toggle()
          } else if (item.label == "Connect Wallet") {
            if (!connected) onConnect()
          } else router.push(item.label.toLowerCase() === 'home' ? "/" : `/${item.label.toLowerCase()}`)
        }}
        // We create an override here to display the buttons in the navbar on mobile devices
        // @ts-ignore
        overrides={
          size.width <= 1136 ? {
            AppName: {
              component: () => (
                <Grid behavior={BEHAVIOR.fixed} gridGaps={20} gridColumns={[12, 12, 12, 12]} overrides={{ Grid: { style: { width: '100%', paddingRight: '0px !important', paddingLeft: '0px !important'  } } }}>
                  <Cell span={6} overrides={{
                    Cell: {
                      style: { display: 'flex !important', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '0px !important', paddingLeft: '0px !important'  }
                    }
                  }}>
                    <HeadingSmall overrides={{ Block: { props: { $marginTop: 0, $marginBottom: 0 } } }}>{process.env.NEXT_PUBLIC_TITLE}</HeadingSmall>
                  </Cell>
                  <Cell span={6} overrides={{
                    Cell: {
                      style: { display: 'flex !important', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0px !important', paddingRight: '0px !important' }
                    }
                  }}>
                    {connected
                      ? <Button size='compact' shape='pill' >{address.substring(0, 10) + '...'}</Button>
                      : <Button size='compact' shape='pill' kind='secondary' onClick={() => { if (!connected) onConnect() }}>Connect</Button>}
                    <FaLightbulb onClick={() => darkMode.toggle()} style={{ width: 25, height: 25, marginLeft: 10 }} color={theme.colors.contentPrimary} />
                  </Cell>
                </Grid>
              )
            }
          } : {}
        }
      />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>
          <div style={{ marginTop: 50 }}>
            {children}
          </div>
        </Cell>
      </Grid>
      <Block paddingTop="100px">
      </Block>
      <Footer size={size} />
    </div>
  );
};
export default withSize()(Page);
