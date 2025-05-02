import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BlockParamsDto {
  @ApiProperty({
    description: 'Block height',
    example: 123456,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  height: number;
} 