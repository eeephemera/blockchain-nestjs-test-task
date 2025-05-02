import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';

interface BlockResponse {
  result: {
    number: string;
    hash: string;
    parentHash: string;
    gasLimit: string;
    gasUsed: string;
    size: string;
  };
  error?: any;
}

interface TransactionResponse {
  result: {
    hash: string;
    to: string;
    from: string;
    value: string;
    input: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    gasPrice?: string;
  };
  error?: any;
}

@Injectable()
export class EvmService {
  private rpcUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.rpcUrl = this.configService.get<string>('EVM_RPC_URL', 'https://sei-evm-rpc.publicnode.com');
  }

  async getBlockByHeight(height: number) {
    const response = await firstValueFrom<AxiosResponse<BlockResponse>>(
      this.httpService.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [`0x${height.toString(16)}`, false],
        id: 1,
      }).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException(`Block with height ${height} not found or RPC service unavailable`);
        }),
      ),
    );

    if (response.data.error) {
      throw new NotFoundException(`Block with height ${height} not found: ${response.data.error.message}`);
    }

    const block = response.data.result;
    if (!block) {
      throw new NotFoundException(`Block with height ${height} not found`);
    }

    return {
      height: parseInt(block.number, 16),
      hash: block.hash,
      parentHash: block.parentHash,
      gasLimit: parseInt(block.gasLimit, 16),
      gasUsed: parseInt(block.gasUsed, 16),
      size: parseInt(block.size, 16),
    };
  }

  async getTransactionByHash(hash: string) {
    const response = await firstValueFrom<AxiosResponse<TransactionResponse>>(
      this.httpService.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [hash],
        id: 1,
      }).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException(`Transaction with hash ${hash} not found or RPC service unavailable`);
        }),
      ),
    );

    if (response.data.error) {
      throw new NotFoundException(`Transaction with hash ${hash} not found: ${response.data.error.message}`);
    }

    const tx = response.data.result;
    if (!tx) {
      throw new NotFoundException(`Transaction with hash ${hash} not found`);
    }

    return {
      hash: tx.hash,
      to: tx.to,
      from: tx.from,
      value: tx.value,
      input: tx.input,
      maxFeePerGas: tx.maxFeePerGas ? parseInt(tx.maxFeePerGas, 16) : undefined,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? parseInt(tx.maxPriorityFeePerGas, 16) : undefined,
      gasPrice: tx.gasPrice ? parseInt(tx.gasPrice, 16) : undefined,
    };
  }
} 