/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
// import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Application])],
  controllers: [OauthController],
    providers: [OauthService, UsersService],
    exports: [OauthService]
})
export class OauthModule {}
