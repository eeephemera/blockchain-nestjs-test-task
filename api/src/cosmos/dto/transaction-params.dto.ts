import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionParamsDto {
  @ApiProperty({
    description: 'Transaction hash',
    example: 'abc123...',
    pattern: '^[0-9a-fA-F]{64}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{64}$/, {
    message: 'Hash must be a valid Cosmos transaction hash',
  })
  hash: string;
} 