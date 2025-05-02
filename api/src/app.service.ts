import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'Blockchain API',
      description: 'API for fetching blockchain data from EVM and Cosmos networks',
      version: '1.0.0',
      endpoints: {
        evm: [
          { path: '/evm/block/:height', method: 'GET', description: 'Get EVM block by height' },
          { path: '/evm/transactions/:hash', method: 'GET', description: 'Get EVM transaction by hash' },
        ],
        cosmos: [
          { path: '/cosmos/block/:height', method: 'GET', description: 'Get Cosmos block by height' },
          { path: '/cosmos/transactions/:hash', method: 'GET', description: 'Get Cosmos transaction by hash' },
        ],
      },
      docs: '/api',
    };
  }
}
