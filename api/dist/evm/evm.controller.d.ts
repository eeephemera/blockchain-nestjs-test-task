import { EvmService } from './evm.service';
import { BlockParamsDto } from './dto/block-params.dto';
import { TransactionParamsDto } from './dto/transaction-params.dto';
export declare class EvmController {
    private readonly evmService;
    constructor(evmService: EvmService);
    getBlockByHeight(params: BlockParamsDto): Promise<{
        height: number;
        hash: string;
        parentHash: string;
        gasLimit: number;
        gasUsed: number;
        size: number;
    }>;
    getTransactionByHash(params: TransactionParamsDto): Promise<{
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
