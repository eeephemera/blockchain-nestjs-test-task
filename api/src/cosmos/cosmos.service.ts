import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';

interface BlockResponse {
  result: {
    block: {
      header: {
        height: string;
        time: string;
        proposer_address: string;
      };
    };
    block_id: {
      hash: string;
    };
  };
  error?: any;
}

interface TransactionResponse {
  result: {
    hash: string;
    height: string;
    tx: string;
    tx_result: {
      gas_used: string;
      gas_wanted: string;
      timestamp: string;
    };
  };
  error?: any;
}

@Injectable()
export class CosmosService {
  private rpcUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.rpcUrl = this.configService.get<string>('COSMOS_RPC_URL', 'https://sei-m.rpc.n0ok.net:443');
  }

  async getBlockByHeight(height: number) {
    const response = await firstValueFrom<AxiosResponse<BlockResponse>>(
      this.httpService.get(`${this.rpcUrl}/block`, {
        params: {
          height: height.toString(),
        },
      }).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException(`Block with height ${height} not found or RPC service unavailable`);
        }),
      ),
    );

    if (response.data.error) {
      throw new NotFoundException(`Block with height ${height} not found: ${response.data.error.message}`);
    }

    const result = response.data.result;
    if (!result || !result.block || !result.block_id) {
      throw new NotFoundException(`Block with height ${height} not found`);
    }

    const block = result.block;
    const blockID = result.block_id;

    return {
      height: parseInt(block.header.height),
      time: block.header.time,
      hash: blockID.hash,
      proposedAddress: block.header.proposer_address,
    };
  }

  async getTransactionByHash(hash: string) {
    const response = await firstValueFrom<AxiosResponse<TransactionResponse>>(
      this.httpService.get(`${this.rpcUrl}/tx`, {
        params: {
          hash: `0x${hash.replace(/^0x/, '')}`,
          prove: 'true',
        },
      }).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException(`Transaction with hash ${hash} not found or RPC service unavailable`);
        }),
      ),
    );

    if (response.data.error) {
      throw new NotFoundException(`Transaction with hash ${hash} not found: ${response.data.error.message}`);
    }

    const txData = response.data.result;
    if (!txData || !txData.tx_result) {
      throw new NotFoundException(`Transaction with hash ${hash} not found`);
    }

    const txInfo = txData.tx_result;

    return {
      hash: txData.hash,
      height: parseInt(txData.height),
      time: new Date(txInfo.timestamp).toISOString(),
      gasUsed: parseInt(txInfo.gas_used),
      gasWanted: parseInt(txInfo.gas_wanted),
      fee: this.extractFee(txData.tx),
      sender: this.extractSender(txData.tx),
    };
  }

  private extractFee(tx: any) {
    try {
      const decodedTx = JSON.parse(Buffer.from(tx, 'base64').toString());
      return decodedTx.auth_info?.fee?.amount;
    } catch (e) {
      return null;
    }
  }

  private extractSender(tx: any) {
    try {
      const decodedTx = JSON.parse(Buffer.from(tx, 'base64').toString());
      return decodedTx.auth_info?.signer_infos?.[0]?.public_key?.key || 
             decodedTx.body?.messages?.[0]?.sender;
    } catch (e) {
      return null;
    }
  }
} 