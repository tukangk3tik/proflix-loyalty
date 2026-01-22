import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MemberLoginDto, UserLoginDto, LoginResponseDto } from './dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtPayload } from './interfaces/jwt-payload.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('member/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Member login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Account not active' })
  async memberLogin(@Body() dto: MemberLoginDto): Promise<LoginResponseDto> {
    return this.authService.memberLogin(dto);
  }

  @Public()
  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Business user login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Account not active' })
  async userLogin(@Body() dto: UserLoginDto): Promise<LoginResponseDto> {
    return this.authService.userLogin(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user info' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user info from JWT payload',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMe(@CurrentUser() user: JwtPayload) {
    return {
      id: user.sub,
      email: user.email,
      type: user.type,
      role: user.role,
    };
  }
}
