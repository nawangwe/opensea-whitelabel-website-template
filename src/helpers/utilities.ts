import { IChainData } from "./types";
import supportedChains from "./chains";

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