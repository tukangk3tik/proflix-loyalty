import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty({ example: 200 })
  statusCode: number = 200;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty()
  data?: T;

  constructor(message: string, data?: T) {
    this.message = message;
    this.data = data;
  }
}
