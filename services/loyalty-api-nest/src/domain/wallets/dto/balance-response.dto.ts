import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Wallet ID',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Member ID',
  })
  memberId: string;

  @ApiProperty({
    example: 1500,
    description: 'Available balance (points)',
  })
  availableBalance: number;
}
