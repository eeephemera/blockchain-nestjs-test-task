import { CosmosService } from './cosmos.service';
import { BlockParamsDto } from './dto/block-params.dto';
import { TransactionParamsDto } from './dto/transaction-params.dto';
export declare class CosmosController {
    private readonly cosmosService;
    constructor(cosmosService: CosmosService);
    getBlockByHeight(params: BlockParamsDto): Promise<{
        height: number;
        time: string;
        hash: string;
        proposedAddress: string;
    }>;
    getTransactionByHash(params: TransactionParamsDto): Promise<{
        hash: string;
        height: number;
        time: string;
        gasUsed: number;
        gasWanted: number;
        fee: any;
        sender: any;
    }>;
}
