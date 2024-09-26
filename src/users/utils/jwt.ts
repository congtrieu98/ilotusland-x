/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt'

export const signToken = ({
    payload,
    privateKey,
}: {
    payload: string | Buffer | object,
    privateKey?: string,
}) => {
    return new Promise<string>((resolve) => {
        const jwtService = new JwtService();
        const token = jwtService.signAsync(payload as object, { secret: process.env.JWT_SECRET, privateKey: privateKey })
        console.log('token:', token);

        return resolve(token)
    })
}
