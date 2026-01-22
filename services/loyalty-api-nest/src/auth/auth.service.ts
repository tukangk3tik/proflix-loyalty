import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { Member } from '../domain/members/entities/member.entity';
import { User } from '../domain/users/entities/user.entity';
import { MemberLoginDto, UserLoginDto, LoginResponseDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthType } from './enum/auth-type.enum';
import { MemberStatus } from '../domain/members/enum/member-status.enum';
import { UserStatus } from '../domain/users/enum/user-status.enum';
import { HashingService } from './hashing';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Member login - for loyalty program members
   */
  async memberLogin(dto: MemberLoginDto): Promise<LoginResponseDto> {
    const member = await this.memberRepository.findOne({
      where: {
        email: dto.email,
        softDelete: { isDeleted: false },
      },
    });

    if (!member) {
      throw new UnauthorizedException('Account does not exist');
    }

    // Check member status
    if (member.status === MemberStatus.PENDING) {
      throw new BadRequestException(
        'Account is pending activation. Please verify your email.',
      );
    }

    if (member.status === MemberStatus.INACTIVE) {
      throw new BadRequestException(
        'Account is inactive. Please contact support.',
      );
    }

    if (member.status === MemberStatus.CANCELED) {
      throw new BadRequestException('Account has been cancelled.');
    }

    // Verify password (using simple hash for demo - use bcrypt in production)
    const isPasswordValid = await this.hashingService.compare(
      dto.password,
      member.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload: JwtPayload = {
      sub: member.id,
      email: member.email,
      type: AuthType.MEMBER,
    };

    return this.generateTokenResponse(payload);
  }

  /**
   * User (business) login - for admin/ops users
   */
  async userLogin(dto: UserLoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        username: dto.username,
        softDelete: { isDeleted: false },
      },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Check user status
    if (user.status === UserStatus.SUSPENDED) {
      throw new BadRequestException(
        'Account is suspended. Please contact administrator.',
      );
    }

    if (user.status === UserStatus.DISABLED) {
      throw new BadRequestException('Account is disabled.');
    }

    // Verify password
    const isPasswordValid = await this.hashingService.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Update last login time
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    // Generate JWT token
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      type: AuthType.USER,
      role: user.role?.roleCode,
    };

    return this.generateTokenResponse(payload);
  }

  /**
   * Generate token response
   */
  private generateTokenResponse(payload: JwtPayload): LoginResponseDto {
    const ttl = this.configService.get<string>('JWT_TTL') || '1h';
    const expiresIn = this.parseJwtTtl(ttl);

    const accessToken = this.jwtService.sign(
      payload as unknown as Record<string, unknown>,
      {
        expiresIn: ttl as `${number}${'s' | 'm' | 'h' | 'd'}`,
      },
    );

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
    };
  }

  /**
   * Parse JWT TTL string to seconds
   */
  private parseJwtTtl(ttl: string): number {
    const match = ttl.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
      return 3600; // default 1 hour
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      default:
        return 3600;
    }
  }

  /**
   * Verify password using SHA-256 (use bcrypt in production)
   * This is a simplified implementation for demo purposes
   */
  private verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): boolean {
    // For demo: using SHA-256 hash
    // In production, use bcrypt.compare()
    const hash = crypto
      .createHash('sha256')
      .update(plainPassword)
      .digest('hex');
    return hash === hashedPassword;
  }

  /**
   * Hash password using SHA-256 (use bcrypt in production)
   */
  hashPassword(plainPassword: string): string {
    return crypto.createHash('sha256').update(plainPassword).digest('hex');
  }
}
