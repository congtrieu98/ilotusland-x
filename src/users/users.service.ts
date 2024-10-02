/* eslint-disable prettier/prettier */
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dtos/user-create.dto';
// import * as crypto from 'crypto';
import { decodePassword, hashPassword } from './utils/crypto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(userCreate: UserCreateDto) {
        console.log("userCreate:", userCreate)
        try {
            const { email, password, clientId } = userCreate
            const payload = {
                email,
                password: await hashPassword(password),
                clientId
            }
            const newUserRepo = this.userRepository.create(payload)
            return await this.userRepository.save(newUserRepo);

        } catch (error) {
            throw new Error(error);
        }
    }

    // async createUser(userCreate: UserCreateDto) {
    //     try {
    //         const { publicKey, privateKey } = crypto.generateKeyPairSync("x448");
    //         const public_key = publicKey.export({ type: 'spki', format: 'pem' });
    //         const private_key = privateKey.export({ type: 'pkcs8', format: 'pem' });

    //         const { email, password } = userCreate
    //         const payload = {
    //             email,
    //             password: await hashPassword(password)
    //         }
    //         const { data: userData, error } = await this.supabaseClient
    //             .from('users')
    //             .insert(payload).select().single()

    //         if (error) {
    //             return { error }
    //         }
    //         if (userData) {
    //             const payload = {
    //                 public_key: public_key,
    //                 private_key: private_key,
    //                 user_id: userData.id
    //             }
    //             const { error } = await this.supabaseClient
    //                 .from('keys')
    //                 .insert(payload);
    //             if (error) throw new Error(error.message);
    //         }

    //         // console.log('public_key:', public_key)
    //         // console.log('private_key:', private_key)

    //         return {
    //             code: 201,
    //             message: "Create user success",
    //             data: userData
    //         }
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }


    async verifyUser(email: string, password: string) {
        // console.log("signDt:", signInDto)
        const user = await this.getUserByEmail(email);

        const hashPassword = await decodePassword(password, user.password)
        if (!user || !hashPassword) {
            throw new UnauthorizedException('Email or password is incorrect');
        }
        return user
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (user) {
                return user;
            }
            throw new HttpException('Not found user', 404);
        } catch (error) {
            throw Error(error.message)
        }
    }
}
