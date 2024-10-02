import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizeCode } from './entities/authorizeCode.entity';
import { ApplicationsService } from 'src/applications/applications.service';

import { AuthModule } from 'src/auth/auth.module';
import { ApplicationsModule } from 'src/applications/applications.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizeCode]),
    UsersModule,
    AuthModule,
    ApplicationsModule,
  ],
  controllers: [OauthController],
  providers: [OauthService, ApplicationsService],
  exports: [OauthService],
})
export class OauthModule {}
