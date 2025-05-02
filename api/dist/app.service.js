"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
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
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map