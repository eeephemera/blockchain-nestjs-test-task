import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class CosmosService {
    private readonly httpService;
    private readonly configService;
    private rpcUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getBlockByHeight(height: number): Promise<{
        height: number;
        time: string;
        hash: string;
        proposedAddress: string;
    }>;
    getTransactionByHash(hash: string): Promise<{
        hash: string;
        height: number;
        time: string;
        gasUsed: number;
        gasWanted: number;
        fee: any;
        sender: any;
    }>;
    private extractFee;
    private extractSender;
}
