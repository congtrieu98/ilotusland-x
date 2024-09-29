/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/users/contants/enum';
// import { UserCreateDto } from 'src/users/dtos/user-create.dto';
// import { TokenType } from 'src/users/contants/enum';
import { UsersService } from 'src/users/users.service';
// import { decodePassword } from 'src/users/utils/crypto';
// import { signToken } from 'src/users/utils/jwt';
// import { signToken } from 'src/users/utils/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    private async signAccessToken(payload: object, publicKey: string) {
        const access_token = await this.jwtService.signAsync(
            { ...payload, token_type: TokenType.AccessToken },
            { secret: process.env.JWT_SECRET, privateKey: publicKey }
        )
        return access_token
    }

    private async signRefreshToken(payload: object, privateKey: string) {
        const refresh_token = await this.jwtService.signAsync(
            { ...payload, token_type: TokenType.RefreshToken },
            { secret: process.env.JWT_SECRET, privateKey: privateKey }
        )
        return refresh_token
    }

    // async signIn(signInDto: UserCreateDto) {
    //     const user = await this.usersService.getUserByEmail(signInDto.email);
    //     const hashPassword = await decodePassword(signInDto.password, user.data.password)
    //     // console.log("user:", user)
    //     // console.log("hashPassword:", hashPassword)
    //     if (!user || !(hashPassword)) {
    //         throw new UnauthorizedException('Email or password is incorrect');
    //     }

    //     const payload = { sub: user.data.id, email: user.data.email };
    //     const privateKey = user.data.keys[0].private_key
    //     const publicKey = user.data.keys[0].public_key
    //     const [access_token, refresh_token] = await Promise.all([
    //         this.signAccessToken(payload, publicKey),
    //         this.signRefreshToken(payload, privateKey)
    //     ])

    //     return {
    //         code: 201,
    //         message: "Login success",
    //         data: {
    //             access_token,
    //             refresh_token
    //         }
    //     }
    // }
}
