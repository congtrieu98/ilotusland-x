import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateAuthzCode } from './dtos/create-authz-code.dto';
import { AuthorizeCode } from './entities/authorizeCode.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OauthService {
  constructor(
    // private readonly usersService: UsersService,
    @InjectRepository(AuthorizeCode)
    private authorizationCodeRepository: Repository<AuthorizeCode>,
  ) {}

  // async authorize(signInDto: LoginDto) {
  //     console.log("signDt:", signInDto)
  //     const user = await this.usersService.getUserByEmail(signInDto.email);

  //     const hashPassword = await decodePassword(signInDto.password, user.password)
  //     if (!user || !hashPassword) {
  //         throw new UnauthorizedException('Email or password is incorrect');
  //     }

  //     return user
  // }

  private authorizationCodes: { [key: string]: any } = {};
  async createAuthorizationCode(createAuthzCode: CreateAuthzCode) {
    console.log('createAuthzCode:', createAuthzCode);
    const code = crypto.randomBytes(32).toString('hex');

    this.authorizationCodes[code] = {
      client_id: createAuthzCode.client_id,
      user_id: createAuthzCode.user_id,
      code_challenge: createAuthzCode.code_challenge,
      code_challenge_method: createAuthzCode.code_challenge_method,
    };

    const authorizationCode = new AuthorizeCode();
    authorizationCode.code = code;
    authorizationCode.code_challenge = createAuthzCode.code_challenge;
    authorizationCode.code_challenge_method =
      createAuthzCode.code_challenge_method;
    authorizationCode.user = createAuthzCode.user_id;
    authorizationCode.client = createAuthzCode.client_id;
    authorizationCode.respose_type = createAuthzCode.response_type;
    await this.authorizationCodeRepository.save(authorizationCode);
    return {
      code: code,
    };
  }
}
