# Blockchain API

This API provides endpoints to fetch blockchain data from both EVM-compatible networks (Ethereum) and Cosmos-based networks.

## Available Endpoints

### EVM Endpoints

- `GET /evm/block/:height` - Get block information by block height
- `GET /evm/transactions/:hash` - Get transaction information by transaction hash

### Cosmos Endpoints

- `GET /cosmos/block/:height` - Get block information by block height
- `GET /cosmos/transactions/:hash` - Get transaction information by transaction hash

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Environment Variables

The following environment variables can be configured:

- `PORT` - Port to run the server on (default: 3000)
- `EVM_RPC_URL` - URL for the EVM-compatible node (default: https://sei-evm-rpc.publicnode.com)
- `COSMOS_RPC_URL` - URL for the Cosmos-based node (default: https://sei-m.rpc.n0ok.net:443)

## API Examples

### Get EVM Block by Height

```
GET /evm/block/123456
```

### Get EVM Transaction by Hash

```
GET /evm/transactions/0x123...
```

### Get Cosmos Block by Height

```
GET /cosmos/block/123456
```

### Get Cosmos Transaction by Hash

```
GET /cosmos/transactions/abc123...
```
