const OPENSEA_BASE_URI = 'https://api.opensea.io/wyvern/v1';

export const getOSAssetOrder = async ({tokenAddress, tokenId, orderSide}) => {
  const orders = await fetch(
    `${OPENSEA_BASE_URI}/orders/?asset_contract_address=${tokenAddress}&limit=1&side=${orderSide}&token_id=${tokenId}&include_orders=true`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-KEY': process.env.OPEN_SEA_API_KEY,
      },
    },
  )
    .then((response) => response.json())
    .then((json) => json.orders[0]);

  return orders;
};
