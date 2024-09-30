/* eslint-disable prettier/prettier */
export class CreateAppDto {
    client_secret: string
    redirect_uris: string[]
    scope: string
    grant_types: string
    response_type: string
}