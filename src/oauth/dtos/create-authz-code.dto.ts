/* eslint-disable prettier/prettier */
export class CreateAuthzCode {
    response_type: string
    client_id: string
    redirect_uri: string
    code_challenge: string
    code_challenge_method: string
    email: string
    password: string
    user_id: string
    scope?: string
    state: string
}