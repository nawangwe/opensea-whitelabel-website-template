import { IChainData } from "./types";
import supportedChains from "./chains";
import BigNumber from 'bignumber.js'
import { Order } from "opensea-js/lib/types";
export const DEFAULT_DECIMALS = 18

export function getChainData(chainId: number): IChainData {
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
}

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals = tokenContract && tokenContract.decimals != null
    ? tokenContract.decimals
    : DEFAULT_DECIMALS

  const amountBN = new BigNumber(baseAmount.toString())
  return amountBN.div(new BigNumber(10).pow(decimals))
}

export function getPriceLabel(order: Order) {
  const { currentPrice, paymentTokenContract } = order
  const price = toUnitAmount(currentPrice, paymentTokenContract)
  const priceLabel = parseFloat(price.toString()).toLocaleString(undefined, { minimumSignificantDigits: 1 })
  const isETH = paymentTokenContract.symbol === "ETH"
  return `${isETH ? "Ξ" : ""} ${priceLabel} ${isETH ? "" : paymentTokenContract.symbol}`
}

export const truncate = (input, characterLength) => input.length > characterLength ? `${input.substring(0, characterLength)}...` : input;