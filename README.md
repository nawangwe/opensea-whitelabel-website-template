
# Opensea whitelabel website template

This is a Scaffold for an opensea marketplace using opensea-js. Based on a NextJS scaffold by [Tajo](https://github.com/tajo/nextjs-baseweb).

With Nextjs we can decide to do either SSR (Server Side Rendering) or Static Generation. This page currently uses Server Side Rendering but might be more beneficial to user Static rendering for users more interested in cost savings. However, this would need a rebuilt everytime an important aspect of the website is updated.

The main goal of this project is to create a template based on baseui that any artists can use to create, display and sell their NFTS on their own website with an added layer of customization.

The current implementation is a simple marketplace for an artist to sell their NFTs.

 - [x] List orders
 - [x] View order details
 - [x] Integrate [web3modal](https://github.com/Web3Modal/web3modal)
 - [x] Purchase NFT
 - [ ] (owner) Sell NFT
 - [ ] (owner) Auction NFT
 - [ ] (guest) List purchased NFTs for current wallet connected
 - [ ] (guest) Sell NFT
 - [ ]  (guest) Auction NFT

## Usage

Clone source code and:

 - Get Infura account at http://infura.io
 
 - Edit **.env.local** and :
	 - add infura project id in `NEXT_PUBLIC_REACT_APP_INFURA_ID` variable
	- add your wallet address in `OPEN_SEA_WALLET_ADDRESS` variable
	- - add your wallet address in `OPEN_SEA_COLLECTION_SLUG` variable
	- change other variables such as titles & links
   
 - `yarn` or `npm install` to install dependencies

 - `yarn dev` or `npm run dev` to run dev server

 - `yarn build` or `npm run build` to build
