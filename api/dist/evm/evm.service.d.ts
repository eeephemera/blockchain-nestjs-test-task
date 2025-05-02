import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class EvmService {
    private readonly httpService;
    private readonly configService;
    private rpcUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getBlockByHeight(height: number): Promise<{
        height: number;
        hash: string;
        parentHash: string;
        gasLimit: number;
        gasUsed: number;
        size: number;
    }>;
    getTransactionByHash(hash: string): Promise<{
        hash: string;
        to: string;
        from: string;
        value: string;
        input: string;
        maxFeePerGas: number | undefined;
        maxPriorityFeePerGas: number | undefined;
        gasPrice: number | undefined;
    }>;
}
