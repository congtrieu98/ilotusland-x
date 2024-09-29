/* eslint-disable prettier/prettier */
export class CreateAppDto {
    client_secret: string
    redirect_uris: string[]
    scope: string
    grant_type: string
    response_type: string
}