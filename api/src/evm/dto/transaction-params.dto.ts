import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionParamsDto {
  @ApiProperty({
    description: 'Transaction hash',
    example: '0x123abc...',
    pattern: '^0x[0-9a-fA-F]{64}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: 'Hash must be a valid Ethereum transaction hash',
  })
  hash: string;
} 