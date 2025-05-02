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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const evm_service_1 = require("./evm.service");
const block_params_dto_1 = require("./dto/block-params.dto");
const transaction_params_dto_1 = require("./dto/transaction-params.dto");
let EvmController = class EvmController {
    evmService;
    constructor(evmService) {
        this.evmService = evmService;
    }
    getBlockByHeight(params) {
        return this.evmService.getBlockByHeight(params.height);
    }
    getTransactionByHash(params) {
        return this.evmService.getTransactionByHash(params.hash);
    }
};
exports.EvmController = EvmController;
__decorate([
    (0, common_1.Get)('block/:height'),
    (0, swagger_1.ApiOperation)({ summary: 'Get block information by block height' }),
    (0, swagger_1.ApiParam)({ name: 'height', description: 'Block height', example: 123456 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Block information retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid block height' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Block not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_params_dto_1.BlockParamsDto]),
    __metadata("design:returntype", void 0)
], EvmController.prototype, "getBlockByHeight", null);
__decorate([
    (0, common_1.Get)('transactions/:hash'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transaction information by transaction hash' }),
    (0, swagger_1.ApiParam)({ name: 'hash', description: 'Transaction hash', example: '0x123abc...' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction information retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid transaction hash' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transaction not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_params_dto_1.TransactionParamsDto]),
    __metadata("design:returntype", void 0)
], EvmController.prototype, "getTransactionByHash", null);
exports.EvmController = EvmController = __decorate([
    (0, swagger_1.ApiTags)('evm'),
    (0, common_1.Controller)('evm'),
    __metadata("design:paramtypes", [evm_service_1.EvmService])
], EvmController);
//# sourceMappingURL=evm.controller.js.map