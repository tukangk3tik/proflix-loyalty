import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly offset?: number;
}
