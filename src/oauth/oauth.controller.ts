import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { OauthService } from './oauth.service';
import { CreateAuthzCode } from './dtos/create-authz-code.dto';
import { ApplicationsService } from 'src/applications/applications.service';
import { UsersService } from 'src/users/users.service';

@Controller('oauth')
export class OauthController {
  constructor(
    private applicationService: ApplicationsService,
    private oauthService: OauthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  async authorize(@Body() createAuthzCode: CreateAuthzCode) {
    console.log('createAuthzCode:', createAuthzCode);
    if (createAuthzCode.response_type !== 'code') {
      throw new UnauthorizedException('Unsupported response type');
    }

    const client = await this.applicationService.validateClient(
      createAuthzCode.client_id,
    );
    if (!client) {
      throw new UnauthorizedException('Invalid client');
    }

    const user = await this.userService.verifyUser(
      createAuthzCode.email,
      createAuthzCode.password,
    );

    if (!user) {
      throw new HttpException('Not found user', 404);
    }

    const authorizationCode = await this.oauthService.createAuthorizationCode({
      ...createAuthzCode,
      user_id: user.id,
      redirect_uri: createAuthzCode.redirect_uri,
    });
    const url = createAuthzCode.redirect_uri;
    if (createAuthzCode.state) {
      const redirectUrl = new URL(url);
      redirectUrl.searchParams.append('code', authorizationCode.code);
      return redirectUrl.toString();
    }
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('token')
  // async getToken(@Body() ) {

  // }
}
