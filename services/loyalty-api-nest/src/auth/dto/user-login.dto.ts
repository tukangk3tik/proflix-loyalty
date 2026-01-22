import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Username for business user login',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
