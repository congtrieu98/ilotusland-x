/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserCreateDto } from './dtos/user-create.dto';
import * as crypto from 'crypto';
import { hashPassword } from './utils/crypto';

@Injectable()
export class UsersService {
    private supabaseClient: SupabaseClient
    constructor() {
        this.supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    }

    async createUser(userCreate: UserCreateDto) {
        try {
            const { publicKey, privateKey } = crypto.generateKeyPairSync("x448");
            const public_key = publicKey.export({ type: 'spki', format: 'pem' });
            const private_key = privateKey.export({ type: 'pkcs8', format: 'pem' });

            const { email, password } = userCreate
            const payload = {
                email,
                password: await hashPassword(password)
            }
            const { data: userData, error } = await this.supabaseClient
                .from('users')
                .insert(payload).select().single()

            if (error) {
                return { error }
            }
            if (userData) {
                const payload = {
                    public_key: public_key,
                    private_key: private_key,
                    user_id: userData.id
                }
                const { error } = await this.supabaseClient
                    .from('keys')
                    .insert(payload);
                if (error) throw new Error(error.message);
            }

            // console.log('public_key:', public_key)
            // console.log('private_key:', private_key)

            return {
                code: 201,
                message: "Create user success",
                data: userData
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const { data, error } = await this.supabaseClient
                .from('users')
                .select(`id, email, keys(*)`)
                .eq('email', email)
                .single()

            if (error) {
                return { error }
            }

            return {
                data
            }
        } catch (error) {
            throw Error(error)
        }
    }
}
