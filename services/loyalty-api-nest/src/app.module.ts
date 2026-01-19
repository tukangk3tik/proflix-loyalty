import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MembersModule } from './domain/members/members.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [CommonModule, MembersModule, DatabaseModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
