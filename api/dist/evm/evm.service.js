"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let EvmService = class EvmService {
    httpService;
    configService;
    rpcUrl;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.rpcUrl = this.configService.get('EVM_RPC_URL', 'https://sei-evm-rpc.publicnode.com');
    }
    async getBlockByHeight(height) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.rpcUrl, {
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [`0x${height.toString(16)}`, false],
            id: 1,
        }).pipe((0, operators_1.catchError)((error) => {
            throw new common_1.NotFoundException(`Block with height ${height} not found or RPC service unavailable`);
        })));
        if (response.data.error) {
            throw new common_1.NotFoundException(`Block with height ${height} not found: ${response.data.error.message}`);
        }
        const block = response.data.result;
        if (!block) {
            throw new common_1.NotFoundException(`Block with height ${height} not found`);
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
    async getTransactionByHash(hash) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.rpcUrl, {
            jsonrpc: '2.0',
            method: 'eth_getTransactionByHash',
            params: [hash],
            id: 1,
        }).pipe((0, operators_1.catchError)((error) => {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found or RPC service unavailable`);
        })));
        if (response.data.error) {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found: ${response.data.error.message}`);
        }
        const tx = response.data.result;
        if (!tx) {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found`);
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
};
exports.EvmService = EvmService;
exports.EvmService = EvmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], EvmService);
//# sourceMappingURL=evm.service.js.map