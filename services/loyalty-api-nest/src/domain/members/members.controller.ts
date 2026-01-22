import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { IdDto } from '../../common/dto/uuid.dto';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register a new member (public)' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all members' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.membersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a member by ID' })
  findOne(@Param() { id }: IdDto) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a member' })
  update(@Param() { id }: IdDto, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a member' })
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
