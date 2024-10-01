/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Application } from 'src/applications/entities/application.entity';
// import { LoginDto } from 'src/auth/dtos/login-dto';
import { UsersService } from 'src/users/users.service';
// import { decodePassword } from 'src/users/utils/crypto';
import { Repository } from 'typeorm';
import * as crypto from 'crypto'
import { CreateAuthzCode } from './dtos/create-authz-code.dto';
import { AuthorizeCode } from './entities/authorizeCode.entity';

@Injectable()
export class OauthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly applicationRepository: Repository<Application>,
        private readonly authorizationCodeRepository: Repository<AuthorizeCode>
    ) { }

    async validateClient(clientId: string) {
        try {
            const client = await this.applicationRepository.findOne({ where: { id: clientId} });
            if (client) {
                return client;
            }
            throw new HttpException('Not found client', 404);
        } catch (error) {
            throw Error(error.message)
        }
        
    }

    // async authorize(signInDto: LoginDto) {
    //     console.log("signDt:", signInDto)
    //     const user = await this.usersService.getUserByEmail(signInDto.email);

    //     const hashPassword = await decodePassword(signInDto.password, user.password)
    //     if (!user || !hashPassword) {
    //         throw new UnauthorizedException('Email or password is incorrect');
    //     }

    //     return user
    // }

    async createAuthorizationCode(createAuthzCode: CreateAuthzCode) {
        const code = crypto.randomBytes(32).toString('hex');
        const authorizationCode = new AuthorizeCode();
        authorizationCode.code = code;
        authorizationCode.code_challenge = createAuthzCode.codeChallenge;
        authorizationCode.code_challenge_method = createAuthzCode.codeChallengeMethod;
        authorizationCode.user_id = createAuthzCode.userId;
        authorizationCode.client_id = createAuthzCode.clientId;
        authorizationCode.respose_type = createAuthzCode.responseType;
        return await this.authorizationCodeRepository.save(authorizationCode);
        
    }
}
