/* eslint-disable prettier/prettier */
export class CreateAuthzCode {
    responseType: string
    clientId: string
    redirectUri: string[]
    codeChallenge: string
    codeChallengeMethod: string
    email: string
    password: string
    userId: string
    scope?: string
}