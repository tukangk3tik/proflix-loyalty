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
import { IdDto } from '../../common';
import { CurrentUser, MemberOnly, Public } from '../../auth';
import type { JwtPayload } from '../../auth';

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

  @Patch()
  @MemberOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a member' })
  update(
    @CurrentUser() user: JwtPayload,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(user.sub, updateMemberDto);
  }

  @Delete()
  @MemberOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a member' })
  remove(
    @CurrentUser() user: JwtPayload,
    @Body('reason') removalReason?: string,
  ) {
    return this.membersService.remove(user.sub, removalReason);
  }
}
