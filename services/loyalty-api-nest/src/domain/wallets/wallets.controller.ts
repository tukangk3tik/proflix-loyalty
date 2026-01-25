import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { WalletsService } from './wallets.service';
import { BalanceResponseDto } from './dto';
import { MemberOnly } from '../../auth/decorators/auth-type.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('balance')
  @ApiBearerAuth()
  @MemberOnly()
  @ApiOperation({ summary: 'Get current member balance' })
  @ApiResponse({
    status: 200,
    description: 'Member balance retrieved successfully',
    type: BalanceResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only members can access this' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async getBalance(@CurrentUser() user: JwtPayload) {
    return this.walletsService.getBalance(user.sub);
  }
}
