import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from '../../common/utils/common.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly walletsService: WalletsService,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = this.memberRepository.create(createMemberDto);
    await this.memberRepository.save(member);
    await this.walletsService.createWallet(member.id);
    return member;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.memberRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.MEMBER,
    });
  }

  async findOne(id: string) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new NotFoundException(`Member not found`);
    }
    return member;
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: string) {
    return `This action removes a #${id} member`;
  }
}
