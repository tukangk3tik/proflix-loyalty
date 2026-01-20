import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateMemberDto {
  @IsPhoneNumber('ID')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Length(2, 50)
  fullname: string;

  @IsOptional()
  @IsString()
  referral_code?: string;
}
