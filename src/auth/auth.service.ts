/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/users/contants/enum';
// import { TokenType } from 'src/users/contants/enum';
import { UsersService } from 'src/users/users.service';
import { signToken } from 'src/users/utils/jwt';
// import { signToken } from 'src/users/utils/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    private signAccessToken(user_id: string, privateKey: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.AccessToken,
                privateKey
            }
        })
    }

    private signRefreshToken(user_id: string, privateKey: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.RefreshToken,
                privateKey
            }
        })
    }

    async signIn(email: string) {
        const user = await this.usersService.getUserByEmail(email);
        console.log("user:", user)
        if (!user) {
            throw new UnauthorizedException();
        }

        // const payload = { sub: user.data.id, email: user.data.email };
        // const user_id = user.data.id
        // const privateKey = user.data.keys.private_key
        // const [access_token, refresh_token] = await Promise.all([
        //     this.signAccessToken(user_id, privateKey: ),
        //     this.signRefreshToken(user_id)
        // ])
        // const access_token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET  })

        return {
            code: 201,
            message: "Login success",
            // data: {
            //     access_token,
            //     refresh_token
            // }
        }
    }
}
