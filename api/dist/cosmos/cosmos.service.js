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
exports.CosmosService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let CosmosService = class CosmosService {
    httpService;
    configService;
    rpcUrl;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.rpcUrl = this.configService.get('COSMOS_RPC_URL', 'https://sei-m.rpc.n0ok.net:443');
    }
    async getBlockByHeight(height) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.rpcUrl}/block`, {
            params: {
                height: height.toString(),
            },
        }).pipe((0, operators_1.catchError)((error) => {
            throw new common_1.NotFoundException(`Block with height ${height} not found or RPC service unavailable`);
        })));
        if (response.data.error) {
            throw new common_1.NotFoundException(`Block with height ${height} not found: ${response.data.error.message}`);
        }
        const result = response.data.result;
        if (!result || !result.block || !result.block_id) {
            throw new common_1.NotFoundException(`Block with height ${height} not found`);
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
    async getTransactionByHash(hash) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.rpcUrl}/tx`, {
            params: {
                hash: `0x${hash.replace(/^0x/, '')}`,
                prove: 'true',
            },
        }).pipe((0, operators_1.catchError)((error) => {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found or RPC service unavailable`);
        })));
        if (response.data.error) {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found: ${response.data.error.message}`);
        }
        const txData = response.data.result;
        if (!txData || !txData.tx_result) {
            throw new common_1.NotFoundException(`Transaction with hash ${hash} not found`);
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
    extractFee(tx) {
        try {
            const decodedTx = JSON.parse(Buffer.from(tx, 'base64').toString());
            return decodedTx.auth_info?.fee?.amount;
        }
        catch (e) {
            return null;
        }
    }
    extractSender(tx) {
        try {
            const decodedTx = JSON.parse(Buffer.from(tx, 'base64').toString());
            return decodedTx.auth_info?.signer_infos?.[0]?.public_key?.key ||
                decodedTx.body?.messages?.[0]?.sender;
        }
        catch (e) {
            return null;
        }
    }
};
exports.CosmosService = CosmosService;
exports.CosmosService = CosmosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], CosmosService);
//# sourceMappingURL=cosmos.service.js.map