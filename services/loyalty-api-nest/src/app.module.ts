import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MembersModule } from './domain/members/members.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, MembersModule, DatabaseModule, EnvModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
