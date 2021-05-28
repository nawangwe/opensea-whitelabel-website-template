import React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';
import useDarkMode from 'use-dark-mode'
import {BaseProvider, DarkTheme} from 'baseui';
import {styletron} from '../styletron';
import DefaultTheme from '../themes/default'

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode()
    const theme = darkMode.value ? DarkTheme : DefaultTheme
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={theme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    );
}

export default MyApp
