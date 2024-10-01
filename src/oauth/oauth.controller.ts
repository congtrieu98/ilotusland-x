/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
// import { LoginDto } from 'src/auth/dtos/login-dto';
import { OauthService } from './oauth.service';
// import { Response } from 'express';
// import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateAuthzCode } from './dtos/create-authz-code.dto';

@Controller('oauth')
export class OauthController {
    constructor(
        private oauthService: OauthService,
        private authService: AuthService
    ) { }

    @HttpCode(HttpStatus.OK)
    // @Post('authorize')
    // authorize(@Body() signInDto: LoginDto) {
    //     return this.oauthService.authorize(signInDto);
    // }
    @Post('authorize')
    async authorize(
        // @Body('response_type') responseType: string,
        // @Body('client_id') clientId: string,
        // @Body('redirect_uri') redirectUri: string,
        // @Body('scope') scope: string,
        // @Body('code_challenge') codeChallenge: string,
        // @Body('code_challenge_method') codeChallengeMethod: string,
        // @Body('email') email: string,
        // @Body('password') password: string,
        createAuthzCode: CreateAuthzCode,
        // @Res() res: Response,
        // @Req() req: Request,
    ) {
        if (createAuthzCode.responseType !== 'code') {
            throw new UnauthorizedException('Unsupported response type');
        }

        const client = await this.oauthService.validateClient(createAuthzCode.clientId);
        if (!client) {
            throw new UnauthorizedException('Invalid client');
        }


        const user = await this.authService.verifyUser(createAuthzCode.email, createAuthzCode.password);

        if (!user) {
            throw new HttpException('Not found user', 404);
        }


        // const authorizationCode = 
        await this.oauthService.createAuthorizationCode(createAuthzCode);

        // Chuyển hướng với authorization code
        // const redirectUrl = new URL(createAuthzCode.redirectUri[0]);
        // redirectUrl.searchParams.append('code', authorizationCode.code);

        // res.redirect(redirectUrl.toString());
    }
}
