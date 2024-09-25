/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserCreateDto } from './dtos/user-create.dto';
import { hashPassword } from './utils/crypto';

@Injectable()
export class UsersService {
    private supabaseClient: SupabaseClient
    constructor() {
        this.supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
    }

    async createUser(userCreate: UserCreateDto) {
        try {
            const { email, password } = userCreate
            const payload = {
                email,
                password: hashPassword(password)
            }
            const { data: userData, error } = await this.supabaseClient
                .from('users')
                .insert(payload).select().single()

            // console.log("userData:", userData);


            if (error) {
                return { error }
            }

            // const user_id = userData.id
            // const [access_token, refresh_token] = await Promise.all([
            //     this.signAccessToken(user_id),
            //     this.signRefreshToken(user_id)
            // ])

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
            const {data, error} = await this.supabaseClient
            .from('users')
            .select()
            .eq('email', email)
            .single()

            if(error) {
                return {error}
            }

            return {
                data: data
            }
        } catch (error) {
            throw Error(error)
        }
    }
}
