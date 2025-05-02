import { Controller, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CosmosService } from './cosmos.service';
import { BlockParamsDto } from './dto/block-params.dto';
import { TransactionParamsDto } from './dto/transaction-params.dto';

@ApiTags('cosmos')
@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  @ApiOperation({ summary: 'Get block information by block height' })
  @ApiParam({ name: 'height', description: 'Block height', example: 123456 })
  @ApiResponse({ status: 200, description: 'Block information retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid block height' })
  @ApiResponse({ status: 404, description: 'Block not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getBlockByHeight(@Param() params: BlockParamsDto) {
    return this.cosmosService.getBlockByHeight(params.height);
  }

  @Get('transactions/:hash')
  @ApiOperation({ summary: 'Get transaction information by transaction hash' })
  @ApiParam({ name: 'hash', description: 'Transaction hash', example: 'abc123...' })
  @ApiResponse({ status: 200, description: 'Transaction information retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid transaction hash' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @UsePipes(new ValidationPipe())
  getTransactionByHash(@Param() params: TransactionParamsDto) {
    return this.cosmosService.getTransactionByHash(params.hash);
  }
} 