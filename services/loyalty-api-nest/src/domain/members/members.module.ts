import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersSubscriber } from './subscribers/members.subscriber';
import { AuthModule } from '../../auth';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), AuthModule],
  controllers: [MembersController],
  providers: [MembersService, MembersSubscriber],
})
export class MembersModule {}
