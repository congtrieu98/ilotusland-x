/* eslint-disable prettier/prettier */
export class LoginDto {
    email: string
    password: string
    code_challenge: string
    code_challenge_method: string
    redirect_uri: string
    client_id: string
    client_secret: string
}