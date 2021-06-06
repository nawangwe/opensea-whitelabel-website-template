import React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';
import useDarkMode from 'use-dark-mode'
import {BaseProvider, DarkTheme} from 'baseui';
import {styletron} from '../styletron';
import DefaultTheme from '../themes/default'
import Context from '../context';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../globalstyle.css'

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());  

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode(true)
    const theme = darkMode.value ? DarkTheme : DefaultTheme
    const [address, setAddress] = React.useState("")
    const [web3, setWeb3] = React.useState(null)
    const [provider, setProvider] = React.useState(null)
    const [connected, setConnected] = React.useState(false)
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={theme}>
        <Context.Provider value={{
          addressValue: [address, setAddress],
          providerValue: [provider, setProvider],
          connectedValue: [connected, setConnected],
          web3Value: [web3, setWeb3]
        }}>
          <Component {...pageProps} />
        </Context.Provider>
        </BaseProvider>
      </StyletronProvider>
    );
}

export default MyApp
